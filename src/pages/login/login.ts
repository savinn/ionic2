import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebcareAuthenticationService } from "../../app/providers/webcare-authenticate";
import { StreamsPage } from "../streams/streams";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    private username: string = "";
    private password: string = "";
    private environment: string = "";

    constructor(public navCtrl: NavController, public navParams: NavParams, private authenticationService: WebcareAuthenticationService, ) { }

    login() {

        if (!this.username || !this.password || !this.environment) {
            // this.toastService.warn("Please enter username, password and environment");
            return;
        }

        this.authenticationService.login(this.username, this.password, this.environment).subscribe(
            () => {
                this.authenticationService.isAuthenticated = true;
                this.navCtrl.setRoot(StreamsPage);
            },
            error => {
                // this.toastService.error("Not a valid username/password/environment");
            }
        );

        if (this.username && this.password && this.environment) {
            window.localStorage.setItem('username', this.username);
            window.localStorage.setItem('password', this.password);
            window.localStorage.setItem('environment', this.environment);

            this.navCtrl.push(StreamsPage);
        }

    }
    

}
