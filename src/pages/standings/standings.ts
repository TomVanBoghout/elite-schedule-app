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
  divisionFilter = 'division';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _eliteApi: EliteApiService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StandingsPage');
    this.team = this.navParams.data;
    let tournamentData = this._eliteApi.getCurrentTournament();
    this.standings = tournamentData.standings;

    /*this.allStandings = 
      _.chain(this.standings)
      .groupBy('division')
      .toPairs()
      .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
      .value();*/
    console.log('standing: ', this.standings);
    //console.log('division standings', this.allStandings);
    this.allStandings = tournamentData.standings;
    this.filterDivision();
  }

  filterDivision(){
    if (this.divisionFilter === 'all') {
      this.standings = this.allStandings;
    } else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }
  }

  getHeader(record, recordIndex, records) {
    if (recordIndex === 0
    || record.division !== records[recordIndex-1].division) {
      return record.division;
    }
    return null;
  }
}
