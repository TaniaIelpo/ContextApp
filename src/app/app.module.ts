import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar,Style } from '@capacitor/status-bar';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';


import{ HomePageModule} from './home/home.module';
import {NuovoProgettoPageModule} from './nuovo-progetto/nuovo-progetto.module';
import {WebPagesPageModule} from './web-pages/web-pages.module';
import {DocumentiPageModule} from './documenti/documenti.module';
import { NotePageModule } from './note/note.module';
import { AddNotePageModule } from './add-note/add-note.module';
import { VisualizzaNotaPageModule } from './visualizza-nota/visualizza-nota.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

   
import { LetterBoldPipe } from './shared/letter-bold.pipe';
import { SearchFilterPipe } from './shared/filter-pipe';
import { ClickOutsideDirective } from './shared/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    ClickOutsideDirective,
    SearchFilterPipe,
    LetterBoldPipe
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HomePageModule,
    NuovoProgettoPageModule,
    WebPagesPageModule,
    DocumentiPageModule,
    NotePageModule,
    AddNotePageModule,
    VisualizzaNotaPageModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    //StatusBar,
    //SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
