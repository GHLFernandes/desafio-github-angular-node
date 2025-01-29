import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private readonly API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getMyRepos(): Observable<any> {
    return this.http.get(`${this.API_URL}/meus-repositorios`);
  }

  searchRepos(query: string): Observable<any> {
    return this.http.get(`${this.API_URL}/busca?query=${query}`);
  }

  getFavorites(): Observable<any> {
    return this.http.get(`${this.API_URL}/favoritos`);
  }

  addFavorite(name: string): Observable<any> {
    return this.http.post(`${this.API_URL}/favoritos`, { name });
  }
}
