import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Favoritos</h2>
    <ul>
      <li *ngFor="let favorite of favorites">{{ favorite.name }}</li>
    </ul>
  `,
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getFavorites().subscribe((data) => {
      this.favorites = data;
    });
  }
}
