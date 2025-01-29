import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Pesquisar Repositórios</h2>
    <input [(ngModel)]="query" placeholder="Digite o nome do repositório" />
    <button (click)="search()">Pesquisar</button>
    <ul>
      <li *ngFor="let result of results">
        {{ result.name }}
        <button (click)="addToFavorites(result.name)">Favoritar</button>
      </li>
    </ul>
  `,
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  query: string = '';
  results: any[] = [];

  constructor(private apiService: ApiService) {}

  search(): void {
    this.apiService.searchRepos(this.query).subscribe((data) => {
      this.results = data;
    });
  }

  addToFavorites(name: string): void {
    this.apiService.addFavorite(name).subscribe(() => {
      alert(`Repositório "${name}" foi favoritado!`);
    });
  }
}
