import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentiPageRoutingModule } from './documenti-routing.module';

import { DocumentiPage } from './documenti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentiPageRoutingModule
  ],
  declarations: [DocumentiPage]
})
export class DocumentiPageModule {}
