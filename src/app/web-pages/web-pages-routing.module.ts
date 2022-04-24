import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebPagesPage } from './web-pages.page';

const routes: Routes = [
  {
    path: '',
    component: WebPagesPage,
    children:[
      {
        path: 'documenti',
        loadChildren: () => import('../documenti/documenti.module').then( m => m.DocumentiPageModule)
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebPagesPageRoutingModule {}