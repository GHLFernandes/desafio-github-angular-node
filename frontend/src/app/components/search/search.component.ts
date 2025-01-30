import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  query: string = '';
  results: any[] = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  search(): void {
    if (!this.query.trim()) {
      this.toastr.warning(
        `<div class="toast-content flex items-center">
          <span>O campo de busca não pode estar vazio.</span>
        </div>`,
        '',
        { 
          enableHtml: true, 
          toastClass: 'ngx-toastr warning-toast', 
          closeButton: true,
          positionClass: 'toast-top-right'
        }
      ); 
      return;
    }

    this.apiService.searchRepos(this.query).subscribe({
      next: (data) => {
        this.results = data;
        this.toastr.success(
          `<div class="toast-content flex items-center">
            <span>Foram encontrados <strong>${data.length}</strong> repositórios!</span>
          </div>`,
          '',
          { 
            enableHtml: true, 
            toastClass: 'ngx-toastr success-toast', 
            closeButton: true,
            positionClass: 'toast-top-right'
          }
        );
      },
      error: (error) => {
        this.toastr.error(
          `<div class="toast-content flex items-center">
            <span>${error.message}</span>
          </div>`,
          '',
          { 
            enableHtml: true, 
            toastClass: 'ngx-toastr error-toast', 
            closeButton: true,
            positionClass: 'toast-top-right'
          }
        );
      },
    });
  }

  addToFavorites(name: string): void {
    this.apiService.addFavorite(name).subscribe({
      next: () => {
        this.toastr.success(
          `<div class="toast-content flex items-center">
            <span>Repositório "<strong>${name}</strong>" foi favoritado com sucesso!</span>
          </div>`,
          '',
          { 
            enableHtml: true, 
            toastClass: 'ngx-toastr success-toast', 
            closeButton: true,
            positionClass: 'toast-top-right'
          }
        );
      },
      error: (error) => {
        if (error.error?.error.includes("já foi favoritado antes")) {
          this.toastr.warning(
            `<div class="toast-content flex items-center">
              <span>O repositório "<strong>${name}</strong>" já está nos favoritos!</span>
            </div>`,
            '',
            { 
              enableHtml: true, 
              toastClass: 'ngx-toastr warning-toast', 
              closeButton: true,
              positionClass: 'toast-top-right'
            }
          );
        } else {
          this.toastr.error(
            `<div class="toast-content flex items-center">
               <span>Erro ao favoritar repositório. Tente novamente!</span>
            </div>`,
            '',
            { 
              enableHtml: true, 
              toastClass: 'ngx-toastr error-toast', 
              closeButton: true,
              positionClass: 'toast-top-right'
            }
          );
        }
      },
    });
  }
}