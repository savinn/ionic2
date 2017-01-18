import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { WebcareDataService } from "../../app/providers/webcare-data";
import { UserDetailsPage } from "../user-details/user-details"



import * as _ from "lodash";

const Platforms = [
  { PostType: "facebook", img: "data:image/png;base64,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" },
  { PostType: "twitter", img: "data:image/png;base64,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" }
];

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  messages: any[];
  accounts: any[];
  searchTerm = new FormControl();
  filteredMessages: any[];
  isFiltered = false;
  platforms = Platforms;
  selectedMessage: any;
  
  private stream;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private messagesService: WebcareDataService,
    private socialAccountsService: WebcareDataService,
    private toastCtrl: ToastController) {
    this.stream = navParams.get("stream");


  }


  ionViewWillEnter() {
     this.subscribeGroupedMessages();

        // TODO: when signalR supplies the signal we can remove the interval
        setInterval(() => {
                this.subscribeUpdateGroupedMessages();
            
        }, 10000);

    this.socialAccountsService.getSocialAccounts().subscribe(incomingAccounts => this.accounts = incomingAccounts);

  }

  subscribeGroupedMessages() {
    this.messagesService.getMessagesPerStream(this.stream.StreamId)
      .subscribe(incomingMessages => {
        this.messages = incomingMessages;
        this.getPlatform();
      });
  }
      // TODO: this should be called when signalR knows there are new messages
    subscribeUpdateGroupedMessages() {

        this.messagesService.getMessagesPerStream(this.stream.StreamId).subscribe(
            (newGroupedMessages) => {
                newGroupedMessages.forEach((newGroupedMessage) => {
                    let amountNewMessages = 0;

                    let existingGroupedMessage = _.find(this.messages, (currentStreamGroupedMessage) => {
                        return currentStreamGroupedMessage.Id === newGroupedMessage.Id;
                    });

                    // TODO: check for all changes and create seperate method
                    if (existingGroupedMessage) {
                        if (existingGroupedMessage.Content[0] !== newGroupedMessage.Content[0] ||
                            existingGroupedMessage.MessageAction !== newGroupedMessage.MessageAction) {
                            existingGroupedMessage.Content = newGroupedMessage.Content;
                            existingGroupedMessage.MessageAction = newGroupedMessage.MessageAction;
                            amountNewMessages += 1;
                        }
                    } else {
                        amountNewMessages += 1;
                        this.messages.unshift(newGroupedMessage);
                    }

                    if (amountNewMessages > 0) {
                      this.presentToast();
                      console.log("new");
                      
                        //this.webcareToastService.info(`Stream ${this.model.Name} has ${amountNewMessages} updates`);
                    }
                });
                this.getPlatform();
            },
            
            error => {
                //this.webcareToastService.error("Error retrieving grouped messages.", 0);
            }
        );
    }
  presentToast() {
   let toast = this.toastCtrl.create({
    message: 'The stream has a new message',
    duration: 7000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

  getPlatform(): any {
    for (var i = 0; i < this.messages.length; i++) {
      for (var j = 0; j < this.platforms.length; j++) {
        if (this.platforms[j].PostType === this.messages[i].PostType) {
          this.messages[i] = _.merge(this.messages[i], this.platforms[j]);
        }
      }
    }

  }


  getFilteredMessages() {
    this.isFiltered = true;

    return this.filteredMessages = _.filter(this.messages, Message =>
      Message.Content.join(" ").toLowerCase().indexOf(this.searchTerm.value.toLowerCase()) !== -1

    )
  }

  goToUserDetailsPage(message) {
    this.selectedMessage = message;
    this.navCtrl.push(UserDetailsPage, { message: this.selectedMessage });
  }
}


