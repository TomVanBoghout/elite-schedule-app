import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ToastController } from 'ionic-angular';

import * as _ from 'lodash';
import * as moment from 'moment';

import { GamePage } from '../pages';
import { EliteApiService, UserSettingsService } from "../../providers/providers";

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html'
})
export class TeamDetailPage {
  allGames: any[];
  dateFilter: string;
  games: any[];
  team: any;
  teamStanding: any;
  private tournamentData: any;
  useDateFilter = false;
  isFollowing = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _alertCtrl: AlertController,
              private _toastCtrl: ToastController,
              private _userSettings: UserSettingsService,
              private _eliteApi: EliteApiService) {
    
    console.log("**NavParams**", this.navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetailPage');
    this.team = this.navParams.data;
    this.tournamentData  =this._eliteApi.getCurrentTournament();
    this.games = _.chain(this.tournamentData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2id === this.team.id)
                  .map(g => {
                    let isTeam1 = (g.team1Id === this.team.id);
                    let opponentName = isTeam1 ? g.team2 : g.team1;
                    let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                    return {
                      gameId: g.id,
                      opponent: opponentName,
                      time: Date.parse(g.time),
                      location: g.location,
                      locationUrl: g.locationUrl,
                      scoreDisplay: scoreDisplay,
                      homeAway: (isTeam1 ? "vs." : "at")
                    };
                  })
                  .value();
    this.allGames = this.games;
    this.teamStanding = _.find(this.tournamentData.standings, { 'teamId' :this.team.id});
    this._userSettings.isFavoriteTeam(this.team.id).then(value => this.isFollowing = value);
    console.log("team standings: ", this.teamStanding);
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    } else {
      return "";
    }
  }

  gameClicked($event, game) {
    let sourceGame = this.tournamentData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  getScoreWorL(game): string {
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  getScoreDisplayBadgeClass(game) {
    return this.getScoreWorL(game) === "W" ? 'badge-primary' : 'badge-danger';
  }

  dateChanged() {
    if (this.useDateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allGames;
    }    
  }

  toggleFollow() {
    if (this.isFollowing) {
      let confirm = this._alertCtrl.create({
        title: 'Unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              this._userSettings.unfavoriteTeam(this.team);
              let toast = this._toastCtrl.create({
                message: 'You unfollowed this team',
                duration: 2000,
                position: 'bottom'
              });

              toast.present();

            }
          },
          {
            text: 'No'
          }
        ]
      });
      confirm.present();
    } else  {
      this.isFollowing = true;
      this._userSettings.favoriteTeam(
        this.team, 
        this.tournamentData.tournament.id,
        this.tournamentData.tournament.name
      );
    }
    
  }

  refreshAll(refresher) {
    this._eliteApi.refreshCurrentTournament().subscribe(() => {
      refresher.complete();
      this.ionViewDidLoad();
    })
  }

}
