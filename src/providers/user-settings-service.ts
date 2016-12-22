import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

@Injectable()
export class UserSettingsService {
  

  constructor(public http: Http,
              public storage: Storage) {
    console.log('Hello UserSettingsService Provider');
  }

  favoriteTeam(team, tournamentsId, tournamentName) {
    let item = {team: team, tournamentsId: tournamentsId, tournamentName: tournamentName};
    this.storage.set(team.id, JSON.stringify(item));
  }

  unfavoriteTeam(team) {
    this.storage.remove(team.id);
  }

  isFavoriteTeam(teamId) {
    return this.storage.get(teamId).then(value => value ? true : false);
  }

  getAllFavorites() {
    return new Promise(resolve => {
                let results = [];
                this.storage.forEach(data => {
                    results.push(JSON.parse(data));
                });
                return resolve(results);
            });
  }
}
