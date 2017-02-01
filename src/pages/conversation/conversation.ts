import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebcareDataService } from "../../app/providers/webcare-data";

/*
  Generated class for the Conversation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html'
})
export class ConversationPage {
  message;
  conversationMessages: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private conversationService: WebcareDataService) {
    this.message = navParams.get("message");
  }

  ionViewDidLoad() {
    this.conversationService.getConversation(this.message.RootMessage.Segment, this.message.RootMessage.Id).subscribe(incomingConversationMessages => this.conversationMessages = incomingConversationMessages);
  }

}
