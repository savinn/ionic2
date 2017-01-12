import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebcareDataService } from "../../app/providers/webcare-data";
import { Page2 } from "../page2/page2"

/*
  Generated class for the Streams page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-streams',
  templateUrl: 'streams.html'
})
export class StreamsPage {
  streams: any[];
  selectedStream: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private streamsService: WebcareDataService) {
    this.streamsService.getStreams().subscribe(allStreams => this.streams = allStreams);
  }

   selectStream(stream){
     this.selectedStream = stream;
    this.navCtrl.push(Page2,{streamId: stream.StreamId, streamTitle: stream.Name});
  }
}
