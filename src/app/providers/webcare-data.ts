import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { WebcareAuthenticationService } from "./webcare-authenticate";



@Injectable()
export class WebcareDataService {
    apiUrl: string = "http://r2d2alfa.obi4wan.nl";
    private streamDataUrl = this.apiUrl + "/api/webcare/streams"
  private socialAccountsDataUrl: string = this.apiUrl + "/api/settings/customers/1/socialaccounts/";


    constructor(private http: Http, private authenticationService: WebcareAuthenticationService) { }

    //TODO: create a interceptor for authentication? (no official support in ng2 yet)
    //TODO: create data model for authentication?

    getStreams(): Observable<any> {
        return this.authenticateAndHttpRequest(this.streamDataUrl, RequestTypes.Get, {})
    }

    getMessagesPerStream(streamId: number): Observable<any> {
        const messagesPerStreamDataUrl = `${this.streamDataUrl}/${streamId}/groupedmessages`
        return this.authenticateAndHttpRequest(messagesPerStreamDataUrl, RequestTypes.Get, {})
    }
    getSocialAccounts(): Observable<any>{
        return this.authenticateAndHttpRequest(this.socialAccountsDataUrl, RequestTypes.Get, {})
    }

    private authenticateAndHttpRequest(url: string, requestType: RequestTypes, parameters: any): Observable<any> {
        return this.authenticationService.authenticate()
            .flatMap(authenticationData => this.httpRequest(url, requestType, parameters, authenticationData))
            .map((response: any) => this.handleResponse(response))
            .catch((error: any) => this.handleError(error));
    }

    private httpRequest(url: string, requestType: RequestTypes, parameters: URLSearchParams, authenticationData: any): Observable<any> {
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `${authenticationData.token_type} ${authenticationData.access_token}`);
        const options = new RequestOptions({ headers: headers });

        console.log(`httprequest: ${url}`);

        let observable: Observable<any> = undefined;
        switch (requestType) {
            case RequestTypes.Get:
                observable = this.http.get(url, options);
                break;
            case RequestTypes.Delete:
                observable = this.http.delete(url, options);
                break;
            case RequestTypes.Post:
                observable = this.http.post(url, parameters.rawParams, options);
                break;
            case RequestTypes.Put:
                observable = this.http.put(url, parameters, options);
                break;
        }

        return observable;
    }

    private handleResponse(response: any): any {
        let returnResponse = "";
        if (response && response._body) {
            returnResponse = response.json();
        }
        return returnResponse;
    }

    private handleError(error: any): any {
        const errorMessage = (error && error.message) ? error.message : "unknown data error";
        console.error(errorMessage);
        return Observable.throw(error);
    }
}

//TODO: extract when this is nolonger the only file using RequestTypes
enum RequestTypes {
    Get,
    Post,
    Put,
    Delete
}