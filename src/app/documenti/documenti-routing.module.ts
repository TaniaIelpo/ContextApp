import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentiPage } from './documenti.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentiPageRoutingModule {}
