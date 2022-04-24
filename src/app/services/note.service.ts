import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Note } from 'android/note';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notaAperta:Note;
  note:Note;
  private notes :Note[]= [];

  constructor(private storage:StorageService) { }

  async saveNote(note:Note) {
   await this.storage.getObject('notes').then((data:any)=>{
      this.notes=data == null ? [] :data});
      this.notes.push(note);
   await  this.storage.setObject('notes', this.notes);
   
  } 

  async getNotes(progetto:string ) {
    await this.storage.getObject('notes').then((data:any) =>{ this.notes = data == null ? [] : data});
    if (this.notes.length > 0) {
      this.notes = this.notes.filter((note) => {return note.project === progetto; });
    }
   return this.notes;
   //return this.notes;
  }

  async getNote(createD:number) {
    
   await  this.storage.getObject('notes').then((data:any) => {
        this.notes = data == null ? [] : data});
    this.note=this.notes.find(element=>element.createDate===createD);
    
    return this.note;
  }

  async setNotaAperta(nota:Note){
   await this.storage.setObject("NotaAperta", nota);

  }

  async getNotaAperta(){
    var ret:Note;
    await this.storage.getObject("NotaAperta").then((data:any)=>ret=data);
    return ret;

  }

  async deleteNote(createDate:number) {
    this.notes = this.notes.filter((note) =>{
        return note.createDate !== createDate;
    });
    await this.storage.setObject('notes', this.notes);
  }

async deleteNoteContext(context:string){
  this.notes=this.notes.filter((note)=>{
    return note.project!==JSON.stringify(context);
  })
  await this.storage.setObject('notes', this.notes);
}


}
