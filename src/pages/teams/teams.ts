import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from "../team-home/team-home";
import { EliteApiService } from "../../providers/providers";

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class TeamsPage {
  teams = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _eliteApi: EliteApiService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
    let selectedTournament = this.navParams.data;
    this._eliteApi.getTournamentData(selectedTournament.id).subscribe(data => {
      
      this.teams = data.teams;
    })
  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }

}
