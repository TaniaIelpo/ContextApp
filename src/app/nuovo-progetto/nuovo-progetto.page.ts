import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ModalController, AlertController } from '@ionic/angular';
import { Router, RouterEvent } from '@angular/router';
import { InAppBrowser, InAppBrowserObject } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Item } from 'android/item';


@Component({
  selector: 'app-nuovo-progetto',
  templateUrl: './nuovo-progetto.page.html',
  styleUrls: ['./nuovo-progetto.page.scss'],
})
export class NuovoProgettoPage implements OnInit {

  elements:Item[]=[]; //pagine web e documenti salvati
    
  titolowp:string;
  titoli:string []=[];
  browser:InAppBrowserObject;
  pagina:Item;
  selected:String="google";
  motore:any;
  data:any []=[  //array dei motori di ricerca
    {
      value:"google",
      name:"Goolge",
      sito:"www.google.com"
    },
    {
      value:"yahoo",
      name:"Yahoo",
      sito:"www.yahoo.com"
    },
    {
      value:"bing",
      name:"Bing",
      sito:"www.bing.com"
    },
    {
      value:"ecosia",
      name:"Ecosia",
      sito:"www.ecosia.com"
    },
    {
      value:"startPage",
      name:"Startpage",
      sito:"www.startpage.com"
    },
    {
      value:"qwant",
      name:"Qwant",
      sito:"www.qwant.com"
    },
    {
      value:"duckGo",
      name:"DuckDuckGo",
      sito:"www.duckduckgo.com"
    },
    {
      value:"swisscows",
      name:"SwissCows",
      sito:"www.swisscows.com"
    }
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

  selectedPath='';
  titolo :string;

constructor(
  private storage :StorageService, 
    private modalController: ModalController,
    private router:Router,
    private iab : InAppBrowser,
    private alertController: AlertController
)
     {
      this.router.events.subscribe((event:RouterEvent)=>{
        this.selectedPath=event.url;
      });
}



  ngOnInit() {
  this.storage.getString('attivo').then((data:any)=>{
    this.titolo = data;
    });
    this.motore={value:"google",name:"Google",sito:"www.google.com"};
  }

  onChange(event){
    this.selected=event.target.value;
    console.log("SELEZIONATO MOTORE:"+this.selected);
    for (let index = 0; index < this.data.length; index++) {
      if(this.data[index].value===this.selected)
        this.motore=this.data[index];
    }
  }

  ricerca(){
    this.browser=this.iab.create('https://'+this.motore.sito,'_blank',{});
    this.browser.show();
    this.browser.on('loadstop').subscribe(event=>{
      this.browser.executeScript(
        {code:"document.getElementsByTagName('TITLE')[0].text;"}).then((value:any)=>
          this.titolowp=value);
      this.salva(event.url);      
      
    });
  }


 async salva(url: string) {
   var contest:string;

   await this.storage.getString('attivo').then(value=>contest=value);
    if(this.isFile(url)){
       var documento={

            contesto:contest,
            indirizzo:url,
            titolo:this.titoloDoc(url)
          }
          await this.aggiungi('Documenti',documento);
          this.apriFile(url);

    
    }
    else{
      
          this.pagina={
            contesto:contest,
            indirizzo:url,
            titolo: this.titolowp
          }
          this.aggiungi('WebPages',this.pagina);
          console.log("PAGINA: "+this.pagina.titolo+"CONTESTO: "+this.pagina.contesto);
   
    }
    
  }
  apriFile(indirizzo:string){
    
      var url = 'https://docs.google.com/viewer?url=' + encodeURIComponent(indirizzo); //per aprire nel browser un file .*
      this.browser = this.iab.create(url, '_blank', 'location=no');
        this.browser.show();

  }

  isFile(url:string){
    var extension =url.split('.').pop();
      for (let i = 0; i < this.extToMimes.length;i++){
        if(this.extToMimes[i].ext===extension){
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
    await this.storage.getObject(tipo).then((ris:any)=> {
      this.elements = ris == null ? [] : ris; });
    appoggio = this.elements.filter(doc=> 
        {return JSON.stringify(doc.titolo) === JSON.stringify(url.titolo);});
    if (appoggio.length == 0){
      this.elements.push(url);
      await this.storage.setObject(tipo, this.elements);
    }
    return;
    
  }

  getMimeByExt(name: any) {
    var extention = name.split('.').pop();
    for (let i = 0; i < this.extToMimes.length; i++) {
      if (this.extToMimes[i].ext == extention) {
        return this.extToMimes[i].MType;
      }
    }
  }
  close(){
    this.modalController.dismiss();
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
