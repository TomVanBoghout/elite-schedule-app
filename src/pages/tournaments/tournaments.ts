import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { TeamsPage } from "../teams/teams";
import { EliteApiService } from "../../providers/providers"




/*
  Generated class for the Tournaments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html'
})
export class TournamentsPage {

  tournaments: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private _eliteApi: EliteApiService,
              private _loadingController: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TournamentsPage');

    let loader = this._loadingController.create({
      content: 'Getting tournaments'
    });

    loader.present().then(() => {
      this._eliteApi.getTournaments().then(data => {
        this.tournaments = data;
        loader.dismiss();
      });
    });
  }

  itemTapped($event, tournament) {
    this.navCtrl.push(TeamsPage, tournament);
  }

}
