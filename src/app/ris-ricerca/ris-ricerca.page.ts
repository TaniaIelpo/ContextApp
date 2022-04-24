import { Component, OnInit, ɵConsole } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Item } from 'android/item';
import { Note } from 'android/note';
import { NoteService } from '../services/note.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ris-ricerca',
  templateUrl: './ris-ricerca.page.html',
  styleUrls: ['./ris-ricerca.page.scss'],
})
export class RisRicercaPage implements OnInit {

  app :Note[]=[];
  elements:Item[]=[];
  noteAppoggio :Note[]=[];
  scelte:string []=[];
  Documenti:Item[]=[];
  WebPages :Item[]=[];
  Notes :Note[]=[];
  item:Item;
  nota:Note;

  constructor(
    private storage:StorageService, 
    private noteService:NoteService,
    private iab : InAppBrowser,
    private router:Router) { }

 async ngOnInit() {
    this.storage.getObject('scelte').then(async (data:any)=>{
      this.scelte=data == null ? [] : data;
    for (let index = 0; index < this.scelte.length; index++) {
      
      await this.getElements(this.scelte[index],'Documenti');
      await  this.storage.getObject("risultati").then((data:any)=> this.elements=data == null ?[]: data);
      this.Documenti=this.Documenti.concat(this.elements);
      
      await this.getElements(this.scelte[index],'WebPages');
      await this.storage.getObject("risultati").then((data:any)=>this.elements=data == null ?[]: data);
      this.WebPages=this.WebPages.concat(this.elements);
      
      await this.getNotes(this.scelte[index]);
      await this.storage.getObject("risultati").then((data:any)=>this.noteAppoggio=data == null ?[]: data);
      this.Notes=this.Notes.concat(this.noteAppoggio);
    }
    });
  }

  async getElements(contesto:string, tipo:string){
    var elements:Item []=[];
    await this.storage.getObject(tipo).then(async (data:any)=>{
      elements=data ==null ? [] : data;
    if (elements.length>0){
      elements=elements.filter(el=> {
        return el.contesto===JSON.stringify(contesto)});
      }
      await this.storage.setObject("risultati",elements);
    });
  }

  async getNotes(contesto:string){
    
    await this.noteService.getNotes(JSON.stringify(contesto)).then(async data=> {
    this.app = data == null ? [] : data;
    if(this.app.length>0) console.log("CI SONO NOTE");
     await this.storage.setObject("risultati", this.app);
    });
  }

  itemSelected(documento:string, tipo:string){
    
    var elements:Item[]=[];
    this.storage.getObject(tipo).then((data:any)=>{
      elements=data==null?[]:data;
    if(elements.length>0){
      if(tipo==="Documenti"){
        this.item=elements.find(el=>el.titolo===documento);
        var url = 'https://docs.google.com/viewer?url=' + encodeURIComponent(this.item.indirizzo); //per aprire nel browser un file .*
        var bser = this.iab.create(url, '_blank', 'location=no');
        bser.show();
      }
      else{
        this.item=elements.find(el=>el.indirizzo===documento);
        var browser=this.iab.create(this.item.indirizzo,'_blank');
        browser.show();
      }
    }
  });
  }

  async noteSelected(createDate:number){
    this.noteService.getNote(createDate).then(n=>{
      this.nota=n;
    this.noteService.setNotaAperta(this.nota);
    });
    await this.router.navigate(['/visualizza-nota']);
  }



}
