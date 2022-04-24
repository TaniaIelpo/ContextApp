import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { NoteService } from '../services/note.service';
import { Note } from 'android/note';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {

  note:Note;
  contesto:string;
  data:string;
  dateNow:Date;

  

  constructor(
    private storage:StorageService,
    private noteService:NoteService,
    private router: Router  ) {
    this.note={
      title:'',
      project:'',
      content:'',
      date:'',
      createDate:null


    }
  }

  ngOnInit() {
    this.storage.getString('attivo').then((data:any)=>{
      this.contesto = data;
      });
      this.dateNow =new Date();
      var gg, mese, anno, ore, min;
      gg=this.dateNow.getDate()+"/";
      mese=this.dateNow.getMonth()+1+"/";
      anno=this.dateNow.getFullYear()+"   ";
      ore=this.dateNow.getHours()+":";
      min=this.dateNow.getMinutes()+" ";
      this.data=gg+mese+anno+ore+min;
  }

  async saveNote(){
    this.note.date=this.data;
    this.note.project=this.contesto;
    this.note.createDate=Date.now();
    //this.note.date=new Date();
    
    await this.noteService.saveNote(this.note);

    this.router.navigate(['/note'])
  }

}
