import { Injectable } from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Authenticate provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Search {
  //items;
 
    private searchUrl: string = "https://appservice.obi4wan.com/search";
    constructor(private http: Http) { }


getData(term){
         const search = new URLSearchParams()
            search.set("Identification", "20592");
            search.set("Token", "ECB4480F0B526657EAC8C05025FC1605");
            search.set("environment", "obidev");
            search.set('q',term);

    return this.http.get(this.searchUrl, {search})
        .map(res => res.json())
}
}