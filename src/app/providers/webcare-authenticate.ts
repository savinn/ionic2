import { Injectable } from "@angular/core";
import { Http, Response, URLSearchParams } from "@angular/http";
import { Observable, Observer } from "rxjs/Rx";

@Injectable()
export class WebcareAuthenticationService {
    private authenticationUrl: string = "";//api endpoint removed
    private localStorageName: string = "webcareAuthenticationData";

    isAuthenticated: boolean = false;

    constructor(private http: Http) { }

    authenticate(): Observable<any> {
        const storageData = this.getAuthenticationFromStorage();

        if (storageData && !storageData.isExpired) {
            return Observable.create(
                (observer: Observer<any>) => {
                    observer.next(storageData);
                }
            );
        }
        return this.getAuthenticationFromApi(storageData);
    }

    private username: string;
    private password: string;
    private environment: string;

    login(username: string, password: string, environment: string): Observable<any> {
        this.username = username;
        this.password = password;
        this.environment = environment
        return this.authenticate();
    }

   /* logout() {
        localStorage.removeItem(this.localStorageName);
        this.isAuthenticated = false;
    }*/

    private getAuthenticationFromApi(storageData: any = undefined): Observable<any[]> {
        const params = new URLSearchParams();
        params.set("client_id", "OBI4wanSite");
        if (storageData && storageData.isExpired && storageData.refresh_token) {
            params.set("grant_type", "refresh_token");
            params.set("refresh_token", storageData.refresh_token);
        } else {
            params.set("grant_type", "password");
            params.set("username", this.username);
            params.set("password", this.password);
            params.set("environment", this.environment);

        }

        return (this.http.post(this.authenticationUrl, params)
            .map((response: Response) => this.handleResponse(response))
            .catch((error: any) => this.handleError(error))) as any;
    }

    private getAuthenticationFromStorage(): any {
        let storageData: any = localStorage.getItem(this.localStorageName);
        //Empty localstorage returns null
        if (storageData === null) return undefined;
        storageData = JSON.parse(storageData);
        const timePassedSinceDataCreation = Date.now() - storageData.createdAt;
        const isExpired = timePassedSinceDataCreation >= storageData.expires_in;
        console.log(`check auth isExpired: ${isExpired}! timePassedSinceDataCreation:${timePassedSinceDataCreation}  storageData.expires_in: ${storageData.expires_in}`);
        storageData.isExpired = isExpired;
        return storageData;
    }

    private handleResponse(response: Response): Response {
        const storageData = response.json();
        //Got new data from the server so set the time the token was created
        storageData.createdAt = Date.now();
        storageData.expires_in = storageData.expires_in * 1000;
        const storageDataString: string = JSON.stringify(storageData);
        localStorage.setItem(this.localStorageName, storageDataString);
        return response;
    }

    private handleError(error: any) {
        //TODO: if error then logout
        localStorage.removeItem(this.localStorageName);
        const errorMessage = (error && error.message) ? error.message : "unknown authentication error";
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }
}