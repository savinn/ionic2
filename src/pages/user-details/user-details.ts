import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.message = navParams.get("message");
  }

  ionViewDidLoad() {
    this.urlifyContent();

  }

  urlifyContent(){
    let urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    for (let index = 0; index < this.message.Content.length; ++index){
      this.message.Content[index] = this.message.Content[index].replace(urlRegex,"<a href='$1'>$1</a>");
      }
  }

}
