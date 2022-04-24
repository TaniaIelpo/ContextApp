import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RisRicercaPageRoutingModule } from './ris-ricerca-routing.module';

import { RisRicercaPage } from './ris-ricerca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RisRicercaPageRoutingModule
  ],
  declarations: [RisRicercaPage]
})
export class RisRicercaPageModule {}
