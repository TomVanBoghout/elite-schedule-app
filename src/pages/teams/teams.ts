import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';
import { TeamHomePage } from "../team-home/team-home";
import { EliteApiService } from "../../providers/providers";

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class TeamsPage {
  teams = [];
  private _allTeams: any;
  private _allTeamDivisions: any;
  queryText = "";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _eliteApi: EliteApiService,
              private _loadingController: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
    let selectedTournament = this.navParams.data;

    let loader = this._loadingController.create({
      content: 'Getting data...'
    });

    loader.present().then(() => {
      this._eliteApi.getTournamentData(selectedTournament.id).subscribe(data => {
        this._allTeams = data.teams;
        this._allTeamDivisions = 
            _.chain(data.teams)
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
            .value();
        this.teams = this._allTeamDivisions;
        console.log('division teams', this.teams);
        loader.dismiss();
      })
    })

    
  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }

  updateTeams() {
    console.log('update teams');
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this._allTeamDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
    });

    this.teams = filteredTeams;
  }

}
