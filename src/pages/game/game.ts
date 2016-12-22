import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EliteApiService } from "../../providers/providers";
import { TeamHomePage, MapPage } from '../pages';
declare var window: any;

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
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    this.game = this.navParams.data;
    this.game.gameTime = Date.parse(this.game.time);
  }

  teamTapped(teamId) {
    let tournementData = this._eliteApi.getCurrentTournament();
    let team = tournementData.teams.find(t => t.id === teamId)
    this.navCtrl.push(TeamHomePage, team);
  }

  goToDirections() {
    let tourneyData = this._eliteApi.getCurrentTournament();
    let location = tourneyData.location[this.game.locationId];
    window.location = `geo:${location.latitude},${location.longitude};u=35;`;
  }

  goToMap() {
    this.navCtrl.push(MapPage, this.game);
  }

  isWinner(score1, score2) {
    return Number(score1) > Number(score2);
  }
}
