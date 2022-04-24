import { Component, ViewChild } from '@angular/core';

import { Platform, IonRouterOutlet, AlertController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar,Style } from '@capacitor/status-bar';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  @ViewChild(IonRouterOutlet, {static:false}) routerOutlet:IonRouterOutlet;

  constructor(
    private platform: Platform,
    //private splashScreen: SplashScreen,
    //private statusBar: StatusBar,
    private router:Router,
    private alertController:AlertController,
    private location: PlatformLocation,
    private modalController: ModalController
  ) {
    this.initializeApp();

    this.location.onPopState(async()=>{
      console.log('ON POP');
      const modal = await this.modalController.getTop();
      if(modal){
        modal.dismiss();
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.setStyle({ style: Style.Light });
      SplashScreen.hide();

      //impostare utilizzo harware back button
      this.platform.backButton.subscribeWithPriority(0,async ()=>{ 
        if(this.routerOutlet && this.routerOutlet.canGoBack()){
          this.routerOutlet.pop();
        }
        else if(this.router.url==="/home"){
          const alert=await this.alertController.create({
            header:"Close App",
            message:"Vuoi davvero chiudere l'app?",
            buttons:[
              {
                text:"Rimani",
                role:"cancel"
              },
              {
                text:"Chiudi App",
                handler:()=>{
                  navigator["app"].exitApp();
                }
              }
            ]
          });
          await alert.present();
        }
      })
    });
  }

  
}
