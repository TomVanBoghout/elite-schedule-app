import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'

/*
  Generated class for the EliteApiService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EliteApiService {
  private _baseUrl = 'https://elite-schedule-app-i2-4ea42.firebaseio.com';
  currentTournament: any = {};

  constructor(public http: Http) {
    console.log('Hello EliteApiService Provider');
  }

  getTournaments() {
    return new Promise(resolve => {
      this.http.get(`${this._baseUrl}/tournaments.json`)
          .subscribe(res => resolve(res.json()));
    })
  }

  getTournamentData(tournamentId) : Observable<any>{
    return this.http.get(`${this._baseUrl}/tournaments-data/${tournamentId}.json`)
        .map((response: Response) => {
          this.currentTournament = response.json();
          return this.currentTournament;
        });
  }

  getCurrentTournament() {
    return this.currentTournament;
  }
}
