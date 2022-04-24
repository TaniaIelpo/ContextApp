import { Component, ViewChild } from '@angular/core';
import { AlertController, IonList, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Plugins } from '@capacitor/core';
import { NuovoProgettoPage } from '../nuovo-progetto/nuovo-progetto.page';
import { Item } from 'android/item';
import { NoteService } from '../services/note.service';
import { SelectValueAccessorDirective } from '@ionic/angular/directives/control-value-accessors/select-value-accessor';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms'

const { App } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild ('lista',{static: false}) lista :IonList;

  public context: string[] = [];
  
  nuovoContesto: string;

  
  constructor(public alertController: AlertController, 
    private storage: StorageService, 
    private router: Router,
    private modalController: ModalController,
    private noteService:NoteService  ) {}


  ngOnInit(){

  }

  ionViewWillEnter(){
    this.getStorage();
    this.storage.setString('attivo', null);
  }
  
  
  async aggiungiContesto() {

    const alert = await this.alertController.create({

      header: 'Nuovo Contesto',
      inputs:
        [{
          name: 'nuovoContesto',
          id: 'newContext',
          type: 'text',
          placeholder: 'Titolo contesto'
        }],
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            if(data.nuovoContesto!='' && this.diverso(data.nuovoContesto)){
              this.setStorage(data.nuovoContesto);
              this.presentAlert(data.nuovoContesto);
            }
            else if(data.nuovoContesto==''){
              this.presentAlertStringaVuota();
            }
            else{
              this.presentAlertGiaPresente(data.nuovoContesto);
            }
          }
        }
      ]

    });
    this.ionViewWillEnter();
    alert.present();
    

  }

  async presentAlertGiaPresente(contesto:string) {
    const alert1= await this.alertController.create({
      header: 'ERROR!',
      message: 'Contesto <strong>'+contesto+'</strong> gia presente!!!',
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

  async presentAlertStringaVuota() {
    const alert1= await this.alertController.create({
      header: 'ERROR!!',
      message: 'IL NOME DEL CONTESTO DEVE CONTENERE ALMENO UN CARATTTERE',
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

  diverso(contesto:string) {
    this.getStorage();
    for (let i = 0; i < this.context.length; i++) {
      if(this.context[i]==contesto)
      return false;
      }
      return true;
  }


  setStorage(contesto: string) {
    this.context.push(contesto);
    this.storage.setObject('contesti',
      {
        array: this.context
      });
  }

  getStorage() {

    this.storage.getObject('contesti').then((data: any) => {
      this.context = data.array;
    }).catch(_ => console.log('errore qui'));
  }

  async vai(item: string) {
    this.storage.setString('attivo', item);
    console.log("CONTESTO ATTIVO: "+item);
    this.router.navigate(['/nuovo-progetto']);
  }

 async  removeItem(item: string) {
    this.lista.closeSlidingItems();
    this.context.splice(this.context.indexOf(item),1);
    this.storage.setObject('contesti',
      {
        array: this.context
      });
      this.deleteFile('Documenti',item);
      this.deleteFile('WebPages',item);
      this.noteService.deleteNoteContext(item);
      


  }
  
  async deleteFile(tipo: string, item: string) {
    var files:Item[]=[];
    await this.storage.getObject(tipo).then(async (data:any)=>{
        files = data == null ? [] : data;
        files = files.filter(el=>{return el.contesto.localeCompare(item)>0});
        await this.storage.setObject(tipo, files);
      })
  }

  async presentModal(){
    const modal =await this.modalController.create({
      component:NuovoProgettoPage,
      componentProps:{isModal:true}
    });
    await modal.present();
    if(!window.history.state.modal){
      const modalState={modal:true};
      history.pushState(modalState, null);
    }
  }

  async presentAlert(nc:string){
    const alert1= await this.alertController.create({
      header: 'Confirm!',
      message: 'Contesto <strong>'+nc+'</strong> aggiunto!!!',
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

  async search(){
    
      this.router.navigate(['/search']);
  }

  ricerca(){
    this.router.navigate(['/ricerca']);
  }
}

