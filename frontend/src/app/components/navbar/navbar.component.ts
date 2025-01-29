import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav>
      <ul>
        <li><a routerLink="/repositories">Meus Repositórios</a></li>
        <li><a routerLink="/search">Pesquisar</a></li>
        <li><a routerLink="/favorites">Favoritos</a></li>
      </ul>
    </nav>
  `,
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {}
