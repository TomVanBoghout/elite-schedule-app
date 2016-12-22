import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from "ionic-angular";
import {TournamentsPage, TeamHomePage} from "../pages";
import {EliteApiService, UserSettingsService} from '../../providers/providers';

/*
  Generated class for the MyTeams page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html'
})
export class MyTeamsPage {
  favorites: any[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _eliteApi: EliteApiService,
              private _userSettings: UserSettingsService,
              private _loadingController: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
  }

  goToTournaments() {
    this.navCtrl.push(TournamentsPage);
  }

  favoriteTapped($event, favorite) {
    let loader = this._loadingController.create({
      content: 'getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this._eliteApi.getTournamentData(favorite.tournamentId)
        .subscribe(t => this.navCtrl.push(TeamHomePage, favorite.team));
    
  }

  ionViewDidEnter() {
    this._userSettings.getAllFavorites().then(favs => this.favorites = <any[]>favs);
  }

}
