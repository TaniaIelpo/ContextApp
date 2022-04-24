import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ModalController, IonList } from '@ionic/angular';
import { Router, RouterEvent } from '@angular/router';
import { Item } from 'android/item';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-documenti',
  templateUrl: './documenti.page.html',
  styleUrls: ['./documenti.page.scss'],
})
export class DocumentiPage implements OnInit {

  @ViewChild ('lista',{static: false}) lista :IonList;
  
  elements:Item[]=[];  //pagine web e documenti salvati
  refDocumenti:string[]=[];
  selectedPath='';

  extToMimes = [
    { ext: 'jpeg', MType: 'image/jpeg' },
    { ext: 'jpg', MType: 'image/jpeg' },
    { ext: 'png', MType: 'image/png' },
    { ext: 'doc', MType: 'application/msword' },
    { ext: 'docx', MType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
    { ext: 'xls', MType: 'application/vnd.ms-excel' },
    { ext: 'xlsx', MType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    { ext: 'gif', MType: 'image/gif' },
    { ext: 'pdf', MType: 'application/pdf' }
  ]

  pages=[
    {
      title:'Documenti',
      icon:'folder',
      url:'/documenti'
    },
    {
      title:'Web pages',
      icon:'link',
      url:'/web-pages'
    },
    {
      title:'Note',
      icon:'receipt',
      url:'/note'
    }
  ];


  constructor(
    private storage: StorageService,
    private modalController:ModalController,
    private router:Router,
    private iab:InAppBrowser
    ) {
      this.router.events.subscribe((event:RouterEvent)=>{
        this.selectedPath=event.url;
      });
   }

  async ngOnInit() {
    var cAttivo:string;
    this.storage.getString('attivo').then((data:any)=>{
      cAttivo=data;
    });
    this.storage.getObject('Documenti').then((data:any)=>{
      this.elements=data ==null ? [] : data;
      if (this.elements.length>0){
        this.elements=this.elements.filter(el=>{
          return JSON.stringify(el.contesto)===JSON.stringify(cAttivo)});
        }
      });
        
    
  }

  removeItem(item:Item){  
  this.lista.closeSlidingItems();
  this.elements.splice(this.elements.indexOf(item),1);
   this.storage.setObject('Documenti',this.elements);

  }

  async vai(titolo:string){
   var app:Item[]=[];
    await this.storage.getObject('Documenti').then((ris:any)=>
    {
      app=ris.filter(doc=>{
        return JSON.stringify(doc.titolo)===JSON.stringify(titolo);
      })
      var url = 'https://docs.google.com/viewer?url=' + encodeURIComponent(app[0].indirizzo); //per aprire nel browser un file .*
      var bser = this.iab.create(url, '_blank', 'location=no');
        bser.show();
    });

    
  }

  close(){
    this.modalController.dismiss();
  }

}
