import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuovoProgettoPageRoutingModule } from './nuovo-progetto-routing.module';

import { NuovoProgettoPage } from './nuovo-progetto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuovoProgettoPageRoutingModule
  ],
  declarations: [NuovoProgettoPage]
})
export class NuovoProgettoPageModule {}
