import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'nuovo-progetto',
    loadChildren: () => import('./nuovo-progetto/nuovo-progetto.module').then( m => m.NuovoProgettoPageModule)
  },
  {
    path: 'add-note',
    loadChildren: () => import('./add-note/add-note.module').then( m => m.AddNotePageModule)
  },
  {
    path: 'documenti',
    loadChildren: () => import('./documenti/documenti.module').then( m => m.DocumentiPageModule)
  },
  {
    path: 'note',
    loadChildren: () => import('./note/note.module').then( m => m.NotePageModule)
  },
  {
    path: 'ricerca',
    loadChildren: () => import('./ricerca/ricerca.module').then( m => m.RicercaPageModule)
  },
  {
    path: 'ris-ricerca',
    loadChildren: () => import('./ris-ricerca/ris-ricerca.module').then( m => m.RisRicercaPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'visualizza-nota',
    loadChildren: () => import('./visualizza-nota/visualizza-nota.module').then( m => m.VisualizzaNotaPageModule)
  },
  {
    path: 'web-pages',
    loadChildren: () => import('./web-pages/web-pages.module').then( m => m.WebPagesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
