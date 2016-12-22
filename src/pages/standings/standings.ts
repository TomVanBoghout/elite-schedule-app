import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';

import { EliteApiService } from '../../providers/providers'

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html'
})
export class StandingsPage {
  standings: any[];
  allStandings: any[];
  team: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _eliteApi: EliteApiService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StandingsPage');
    this.team = this.navParams.data;
    let tournamentData = this._eliteApi.getCurrentTournament();
    this.standings = tournamentData.standings;

    this.allStandings = 
      _.chain(this.standings)
      .groupBy('division')
      .toPairs()
      .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
      .value();
    console.log('standing: ', this.standings);
    console.log('division standings', this.allStandings);
  }

}
