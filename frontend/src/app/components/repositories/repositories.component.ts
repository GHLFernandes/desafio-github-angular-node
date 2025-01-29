import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-repositories',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Meus Repositórios</h2>
    <ul>
      <li *ngFor="let repo of repositories">{{ repo.name }}</li>
    </ul>
  `,
  styleUrls: ['./repositories.component.css'],
})
export class RepositoriesComponent implements OnInit {
  repositories: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getMyRepos().subscribe((data) => {
      this.repositories = data;
    });
  }
}
