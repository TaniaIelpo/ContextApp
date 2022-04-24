import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RisRicercaPage } from './ris-ricerca.page';

const routes: Routes = [
  {
    path: '',
    component: RisRicercaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RisRicercaPageRoutingModule {}
