import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  public context: string[] = [];
  public items: string[]=[];

  trovato:string;
  public form: FormGroup= new FormGroup({
    selected: new FormControl(null)
  });


  constructor( 
    private storage: StorageService,
    private router:Router,
    public fb:FormBuilder) { }

     ionViewWillEnter(){
      this.storage.getObject('contesti').then((data: any) => {
        this.context = data.array;
      }).catch(_ => console.log('errore qui'));
     }
     
     inputChanged($event):void{
        const value = $event.target.value;
        if(value.length<=0){
          this.items=[];
          return;
        }
       const items=this.context.filter(item=>item.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
        this.items=items;
      }
  
      async ngOnInit() {
    await this.storage.getString("search").then(data=>this.trovato=data);
    console.log("TROVATO IN SEARCH: "+this.trovato);

  }
  

  async vai(item:string) {
    this.form.patchValue({selected:item});
    await this.storage.setString('attivo', item);
    this.router.navigate(['/nuovo-progetto']);
  }
  
  

}
