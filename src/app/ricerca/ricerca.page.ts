import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.page.html',
  styleUrls: ['./ricerca.page.scss'],
})
export class RicercaPage implements OnInit {

  contesti: string[]=[];
  check:{
    name:string,
    checked:boolean
  }[]=[];

  constructor(private storage : StorageService,
    private router:Router) { }

  async ngOnInit() {
    this.storage.getObject('contesti').then((data: any) => {
      this.contesti= data.array;
      for (let index = 0; index < this.contesti.length; index++) {
        this.check[index]={
          name:this.contesti[index],
          checked:false
        };
      }
    })
  }

    makeChoise(){
      var app:string []=[];
      for (let index = 0; index < this.check.length; index++) {
        if(this.check[index].checked===true)
          app[index]=this.contesti[index];
      }
      this.storage.setObject('scelte', app);
      this.router.navigate(['/ris-ricerca']);
    }
  
}

