import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
//import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';

import { EliteApiService } from "../../providers/providers";
declare var window: any;

@Component({
  templateUrl: 'map.html'
  //directives: [GOOGLE_MAPS_DIRECTIVES]
})
export class MapPage {

  map: any = {};

  constructor(public navParams: NavParams, public eliteApi: EliteApiService) {

  }

  ionViewDidLoad(){
    let games = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTournament();
    let location = tourneyData.locations[games.locationId];

    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: games.location 
    };

  }

  getDirections() { 
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`; 
  }

}
