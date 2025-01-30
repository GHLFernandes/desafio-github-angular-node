import { Routes } from '@angular/router';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { SearchComponent } from './components/search/search.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/repositories', pathMatch: 'full' },
  { path: 'meus-repositorios', component: RepositoriesComponent },
  { path: 'busca', component: SearchComponent },
  { path: 'favoritos', component: FavoritesComponent },
];
