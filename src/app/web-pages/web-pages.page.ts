import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { AlertController, IonList } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Router, RouterEvent } from '@angular/router';
import { Item } from 'android/item';


@Component({
  selector: 'app-web-pages',
  templateUrl: './web-pages.page.html',
  styleUrls: ['./web-pages.page.scss'],
})
export class WebPagesPage implements OnInit {

  @ViewChild ('lista',{static: false}) lista :IonList;

  elements:Item[]=[];  //pagine web e documenti salvati
  appoggio :Item[]=[];
  titolowp:string;
  pagina:Item;
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
  ];
  

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
    private alertController :AlertController,
    private router:Router,
    private iab : InAppBrowser) 
    { 
       this.router.events.subscribe((event:RouterEvent)=>{
          this.selectedPath=event.url;
        });
    }

  ngOnInit() {
    
    var cAttivo:string;
    this.storage.getString('attivo').then((data:any)=>{
      cAttivo=data;
    });
    this.storage.getObject('WebPages').then((data:any)=>{
      this.elements = data == null ? [] : data;
    if(this.elements.length>0){
      this.elements=this.elements.filter(el=>{
      return JSON.stringify(el.contesto)===JSON.stringify(cAttivo)});
    }
  });
  }


  
  vai(titolo:string){
    var app: Item[]=[];
    if(this.elements.length>0){
      app=this.elements.filter(doc=>
        doc.titolo===titolo);
    }
    if(app.length>0){
      const browser=this.iab.create(app[0].indirizzo,'_blank');
      browser.on('loadstop').subscribe(event=>{
        browser.executeScript(
          {code:"document.getElementsByTagName('TITLE')[0].text;"}).then((value:any)=>
            this.titolowp=value);
        this.salva(event.url);      
        
      });
    }
  }
  salva(url: string) {
    var contest:string;
    this.storage.getString('attivo').then(value=>contest=value);
    if(this.isFile(url)){
      var documento={
           contesto:contest,
           indirizzo:url,
           titolo:this.titoloDoc(url)
         }
         this.aggiungi('Documenti',documento);
   }
   else{
     
         this.pagina={
           contesto:contest,
           indirizzo:url,
           titolo: this.titolowp
         }
         this.aggiungi('WebPages',this.pagina);
  
       }
  }

  isFile(url:string){
    var extension =url.split('.').pop();
      for (let i = 0; i < this.extToMimes.length;i++){
        if(this.extToMimes[i].ext==extension){
          return true;
        }
      }
      return false;
  }
  titoloDoc(url:string){
    var nome=url.split('/');
    return nome.pop();
  }

 async aggiungi(tipo:string,url:Item){
  if (typeof(url.titolo) == "undefined") return;
  var appoggio : Item[]=[];
  await this.storage.getObject('WebPages').then((ris:any)=> {
    this.elements = ris == null ? [] : ris; });
      appoggio = this.elements.filter(doc=> 
        { return JSON.stringify(doc.titolo) === JSON.stringify(url.titolo);});
        if (appoggio.length === 0){
          this.elements.push(url);
          await this.storage.setObject(tipo, this.elements);
        }
        return;
  }
  removeItem(item:Item){  
    this.lista.closeSlidingItems();
    this.elements.splice(this.elements.indexOf(item),1);
     this.storage.setObject('WebPages',this.elements);
  
    }
  

  getMimeByExt(name: any) {
    var extention = name.split('.').pop();
    for (let i = 0; i < this.extToMimes.length; i++) {
      if (this.extToMimes[i].ext == extention) {
        return this.extToMimes[i].MType;
      }
    }
  }

  async presentAlert(nc:string){
    const alert1= await this.alertController.create({
      header: 'Confirm!',
      message: nc,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    alert1.present();

  }

}
