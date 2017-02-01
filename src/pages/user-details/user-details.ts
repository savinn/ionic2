import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NotePage} from "../note/note";
import {ConversationPage} from "../conversation/conversation";
import { WebcareDataService } from "../../app/providers/webcare-data";

/*
  Generated class for the UserDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPage {

  private message;
  private accounts;
  filteredAccounts;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private socialAccountsService: WebcareDataService, ) {
    this.message = navParams.get("message");
  }

  ionViewDidLoad() {
    this.urlifyContent();
    this.socialAccountsService.getSocialAccounts().subscribe(incomingAccounts => this.accounts = incomingAccounts);
  }

  getFilteredAccounts(){
  if (this.accounts){
    return this.accounts.filter(
      currentAccount => currentAccount.AccountType.toLowerCase() === this.message.PostType
    );
  }
  }

  urlifyContent() {
    let urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    for (let index = 0; index < this.message.RootMessage.Content.length; ++index) {
      this.message.RootMessage.Content[index] = this.message.RootMessage.Content[index].replace(urlRegex, "<a href='$1'>$1</a>");
    }
  }

  goToConversationPage(){
    this.navCtrl.push(ConversationPage,{message: this.message});
  }

    goToMakeANotePage() {
    this.navCtrl.push(NotePage);
  }

}
