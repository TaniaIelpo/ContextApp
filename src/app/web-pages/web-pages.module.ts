import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebPagesPageRoutingModule } from './web-pages-routing.module';

import { WebPagesPage } from './web-pages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebPagesPageRoutingModule
  ],
  declarations: [WebPagesPage]
})
export class WebPagesPageModule {}
