import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { NavController, NavParams } from 'ionic-angular';
import {Search} from "./search";

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers:[Search]
})
export class Page1 {

  term = new FormControl();
  items: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private searchService: Search) {
   
  }

startSearch() {
 
this.searchService.getData(this.term.value).subscribe(incomingItems => this.items= incomingItems.data)
  
   }
}