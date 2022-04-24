import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizzaNotaPageRoutingModule } from './visualizza-nota-routing.module';

import { VisualizzaNotaPage } from './visualizza-nota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizzaNotaPageRoutingModule
  ],
  declarations: [VisualizzaNotaPage]
})
export class VisualizzaNotaPageModule {}
