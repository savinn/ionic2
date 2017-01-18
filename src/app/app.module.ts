import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { JsonpModule, HttpModule } from '@angular/http';
import { OBI4wan } from './app.component';
import { LoginPage } from '../pages/login/login';
import { StreamsPage} from "../pages/streams/streams";
import {StreamBucketsPage} from "../pages/stream-buckets/stream-buckets";
//import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { UserDetailsPage } from "../pages/user-details/user-details";
import { WebcareAuthenticationService} from "./providers/webcare-authenticate";
import { WebcareDataService} from "./providers/webcare-data";
import {SummaryPipe} from "./pipes/summary.pipe"


@NgModule({
  declarations: [
    OBI4wan,
    LoginPage,
    StreamsPage,
    StreamBucketsPage,
    UserDetailsPage,
   // Page1,
    SummaryPipe,
    Page2
  ],
  imports: [
    IonicModule.forRoot(OBI4wan),
    JsonpModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    OBI4wan,
    LoginPage,
    StreamsPage,
    StreamBucketsPage,
    UserDetailsPage,
    //Page1,
    Page2
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, WebcareAuthenticationService, WebcareDataService ]
})
export class AppModule {}
