import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EliteApiService } from "../../providers/providers";
import { TeamHomePage } from '../pages';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {
  game: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _eliteApi: EliteApiService) 
  {
    this.game = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    
  }

  teamTapped(teamId) {
    let tournementData = this._eliteApi.getCurrentTournament();
    let team = tournementData.teams.find(t => t.id === teamId)
    this.navCtrl.push(TeamHomePage, team);
  }

}
