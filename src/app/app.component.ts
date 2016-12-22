import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
//import {HTTP_PROVIDERS} from '@angular/http'

import {TournamentsPage, TeamHomePage, MyTeamsPage} from "../pages/pages";
import { EliteApiService, UserSettingsService} from '../providers/providers';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];
  rootPage: any = MyTeamsPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              private _loadingController: LoadingController,
              public _events: Events,
              private _eliteApi: EliteApiService,
              private _userSettings: UserSettingsService) {
    this.initializeApp();
    this.refreshFavorites();
    this._events.subscribe('Favorites changed', () => this.refreshFavorites());

    // used for an example of ngFor and navigation
    this.pages = [
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  goHome() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(MyTeamsPage);
  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }

  refreshFavorites() {
    console.log("REFRESH FAVORITES");
    this._userSettings.getAllFavorites().then(favs => {
      this.favoriteTeams = <any[]>favs
      console.log(this.favoriteTeams);
      
    });
  }

  goToTeam(favorite) {
    /*let loader = this._loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this._eliteApi.getTournamentData(favorite.tournamentId).subscribe(l => this.navCtrl.push(TeamHomePage, favorite.team));*/
  }
}
