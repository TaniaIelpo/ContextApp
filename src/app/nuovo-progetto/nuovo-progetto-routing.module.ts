import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuovoProgettoPage } from './nuovo-progetto.page';

const routes: Routes = [
  {
    path: '',
    component: NuovoProgettoPage,
    children:[
      {
        path: 'documenti',
        loadChildren: () => import('../documenti/documenti.module').then( m => m.DocumentiPageModule)
      },
      {
        path: 'web-pages',
        loadChildren: () => import('../web-pages/web-pages.module').then( m => m.WebPagesPageModule)
      },
      {
        path: 'note',
        loadChildren: () => import('../note/note.module').then( m => m.NotePageModule)
      },
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuovoProgettoPageRoutingModule {}