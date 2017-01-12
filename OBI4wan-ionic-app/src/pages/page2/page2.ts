import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { WebcareDataService } from "../../app/providers/webcare-data";


import * as _ from "lodash";


@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  messages: any[];
  searchTerm = new FormControl();
  filteredMessages: any[];
  isFiltered = false;
  private streamId: number;
  private pageTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private messagesService: WebcareDataService,
    private messagesContentService: WebcareDataService) {

    this.streamId = navParams.get("streamId");
    this.pageTitle = navParams.get("streamTitle");
    this.messagesService.getMessagesPerStream(this.streamId).subscribe(incomingMessages => this.messages = incomingMessages)

  }

  getFilteredMessages() {
    this.isFiltered = true;
    
    return this.filteredMessages = _.filter(this.messages, Message =>
      Message.Content.join(" ").toLowerCase().indexOf(this.searchTerm.value.toLowerCase()) !== -1

    )
  }
}


