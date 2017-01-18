import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {WebcareState} from "../../app/providers/webcare-state.enum";
import {Page2} from "../page2/page2";

/*
  Generated class for the StreamBuckets page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-stream-buckets',
  templateUrl: 'stream-buckets.html'
})
export class StreamBucketsPage {
  private stream;
  //TODO: remove this once the data comes back from the API as an array
   bucketsData: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.stream= navParams.get("stream");
  }
 

    private createBucketsData() {
        //TODO: this should be returned from the API in a array
        this.bucketsData = [
            { state: WebcareState.Open, name: "Open", count: this.stream.OpenMessageCount },
            { state: WebcareState.Completed, name: "Completed", count: this.stream.CompletedMessageCount },
            { state: WebcareState.RepliedTo, name: "RepliedTo", count: this.stream.RepliedToMessageCount },
            { state: WebcareState.Saved, name: "Saved", count: this.stream.SavedMessageCount },
            { state: WebcareState.Assigned, name: "Assigned", count: this.stream.AssignedMessageCount },
            { state: WebcareState.MarkedAsSpam, name: "MarkedAsSpam", count: this.stream.MarkedAsSpamMessageCount },
            { state: WebcareState.WaitingForApproval, name: "WaitingForApproval", count: this.stream.WaitingForApprovalMessageCount }
        ];
    }
  ionViewDidLoad() {
    this.createBucketsData();
  }
  onBucketSelected(){
    this.navCtrl.push(Page2, {stream: this.stream});
  }

  
}
