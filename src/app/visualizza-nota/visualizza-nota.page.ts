import { Component, OnInit } from '@angular/core';
import { Note } from 'android/note';
import { NoteService } from '../services/note.service';


@Component({
  selector: 'app-visualizza-nota',
  templateUrl: './visualizza-nota.page.html',
  styleUrls: ['./visualizza-nota.page.scss'],
})
export class VisualizzaNotaPage implements OnInit {
  titolo:string;
  data:string;
  content:string;
  note : Note;
  constructor(private noteService:NoteService) { 
    
  }

 async ngOnInit() {
  var app:Note;
  await this.noteService.getNotaAperta().then((data:any)=>app=data);
  this.note=app;  
  this.titolo=this.note.title;
  this.data=this.note.date;
  this.content=this.note.content;
  }

  async ionViewWillEnter(){
    
      var app:Note;
      await this.noteService.getNotaAperta().then((data:any)=>app=data);
      this.note=app;  
      this.titolo=this.note.title;
      this.data=this.note.date;
      this.content=this.note.content;
      
  }
  

}
