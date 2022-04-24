import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizzaNotaPage } from './visualizza-nota.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizzaNotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizzaNotaPageRoutingModule {}
