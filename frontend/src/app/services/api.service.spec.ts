import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const API_URL = 'http://localhost:3000/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado corretamente', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar "Meus Repositórios"', () => {
    const mockResponse = [{ name: 'Repo1' }, { name: 'Repo2' }];

    service.getMyRepos().subscribe((repos) => {
      expect(repos).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${API_URL}/meus-repositorios`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('deve buscar repositórios pelo nome', () => {
    const mockResponse = { items: [{ name: 'Angular' }, { name: 'NestJS' }] };
    const query = 'angular';

    service.searchRepos(query).subscribe((repos) => {
      expect(repos).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${API_URL}/busca?query=${query}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('deve listar repositórios favoritos', () => {
    const mockResponse = [{ name: 'Repo1' }];

    service.getFavorites().subscribe((favorites) => {
      expect(favorites).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${API_URL}/favoritos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('deve adicionar um repositório aos favoritos', () => {
    const mockResponse = { message: 'Favoritado com sucesso!' };
    const repoName = 'Repo1';

    service.addFavorite(repoName).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${API_URL}/favoritos`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: repoName });
    req.flush(mockResponse);
  });
});
