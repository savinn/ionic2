import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage} from "../pages/login/login";
import { StreamsPage} from "../pages/streams/streams";

//import { Page1 } from '../pages/page1/page1';
//import { Page2 } from '../pages/page2/page2';


@Component({
  templateUrl: 'app.html'
})
export class OBI4wan {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();
    this.checkPreviousAuthorization();

    // used for an example of ngFor and navigation
    this.pages = [
     // { title: 'Old API', component: Page1 },
     // { title: 'New Api', component: Page2 },
        {title: "Streams", component: StreamsPage}
    ];

  }
  checkPreviousAuthorization(): void { 
  if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null) && 
     (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null)&& 
     (window.localStorage.getItem('envoriment') === "undefined" || window.localStorage.getItem('envoriment') === null)) {
    this.rootPage = LoginPage;
  } else {
    this.rootPage = StreamsPage;
  }
}

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
