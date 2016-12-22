import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule} from '@angular/http';
import { Storage } from '@ionic/storage';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { MapPage, TournamentsPage,TeamsPage, TeamDetailPage, GamePage, MyTeamsPage, StandingsPage, TeamHomePage} from "../pages/pages";
import { EliteApiService, UserSettingsService} from '../providers/providers';

@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    GamePage,
    TeamDetailPage,
    TeamsPage,
    TeamHomePage,
    StandingsPage,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBbsOlMryAHu2ESwHHSwrDBIUU7fiENNoM'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    GamePage,
    TeamDetailPage,
    TeamsPage,
    TeamHomePage,
    StandingsPage,
    MapPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EliteApiService,
    UserSettingsService,
    Storage
  ]
})
export class AppModule {}
