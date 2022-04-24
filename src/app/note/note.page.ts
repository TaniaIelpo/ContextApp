import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router, RouterEvent } from '@angular/router';
import { NoteService } from '../services/note.service';
import { Note } from 'android/note';
import { AlertController, IonList } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {
  @ViewChild ('lista',{static: false}) lista :IonList;

  contesto:string;
  notes:Note[]= [];
  note: Note;
  
  selectedPath='';
  
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
    private storage :StorageService,
    private router: Router,
    private noteService:NoteService,
    private alertController:AlertController
     ) {
      
        this.router.events.subscribe((event:RouterEvent)=>{
          this.selectedPath=event.url;
        });
      }

  async ngOnInit() {
   
    await this.storage.getString('attivo').then((data)=>{
      this.contesto = data;
      });
    await this.noteService.getNotes(this.contesto).then((data)=>{
      (this.notes=data == null ? [] : data);
    });
  
  }
  async vai(createDate:number){
    await this.noteService.getNote(createDate).then(element => this.note=element);
    this.noteService.setNotaAperta(this.note);
    await this.router.navigate(['/visualizza-nota']);
  }

  add(){
    this.router.navigate(['/add-note'])
  }

  removeNote(note:Note){
    this.lista.closeSlidingItems();
    this.notes.splice(this.notes.indexOf(note),1);
    this.storage.setObject('notes',this.notes);
  }

  async presentAlert(nc:string){
    const alert1= await this.alertController.create({
      header: 'Confirm!',
      message: 'Contesto <strong>'+nc+'</strong> attivo!!!',
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
