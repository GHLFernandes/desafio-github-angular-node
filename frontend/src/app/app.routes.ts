import { Routes } from '@angular/router';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { SearchComponent } from './components/search/search.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/repositories', pathMatch: 'full' },
  { path: 'repositories', component: RepositoriesComponent },
  { path: 'search', component: SearchComponent },
  { path: 'favorites', component: FavoritesComponent },
];
