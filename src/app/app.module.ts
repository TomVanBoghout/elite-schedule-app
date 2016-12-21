import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule} from '@angular/http';

import {TournamentsPage,TeamsPage, TeamDetailPage, GamePage, MyTeamsPage, StandingsPage, TeamHomePage} from "../pages/pages";
import { EliteApiService} from '../providers/providers';

@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    GamePage,
    TeamDetailPage,
    TeamsPage,
    TeamHomePage,
    StandingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
    StandingsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EliteApiService
  ]
})
export class AppModule {}
