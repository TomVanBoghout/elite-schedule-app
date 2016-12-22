import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

/*
  Generated class for the EliteApiService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EliteApiService {
  private _baseUrl = 'https://elite-schedule-app-i2-4ea42.firebaseio.com';
  currentTournament: any = {};
  private tournamentData = {};

  constructor(public http: Http) {
    console.log('Hello EliteApiService Provider');
  }

  getTournaments() {
    return new Promise(resolve => {
      this.http.get(`${this._baseUrl}/tournaments.json`)
          .subscribe(res => resolve(res.json()));
    })
  }

  getTournamentData(tourneyId, forceRefresh: boolean = false) : Observable<any> {
        if (!forceRefresh && this.tournamentData[tourneyId]) {
            this.currentTournament = this.tournamentData[tourneyId];
            console.log('**no need to make HTTP call, just return the data'); 
            return Observable.of(this.currentTournament);
        }

        // don't have data yet
        console.log('**about to make HTTP call');
        return this.http.get(`${this._baseUrl}/tournaments-data/${tourneyId}.json`)
            .map(response => {
                this.tournamentData[tourneyId] = response.json();
                this.currentTournament = this.tournamentData[tourneyId];
                return this.currentTournament;
            });
    }

  getCurrentTournament() {
    return this.currentTournament;
  }

  refreshCurrentTournament(){
        return this.getTournamentData(this.currentTournament.tournament.id, true); 
    }
}
