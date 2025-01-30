import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-repositories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repositories.component.html',
})
export class RepositoriesComponent implements OnInit {
  repositories: any[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getMyRepos().subscribe({
      next: (data) => {
        this.repositories = data;
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }
}