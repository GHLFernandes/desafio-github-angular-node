import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let apiServiceMock: any;
  let toastrServiceMock: any;

  beforeEach(async () => {
    apiServiceMock = {
      searchRepos: jasmine.createSpy('searchRepos').and.returnValue(of([{ name: 'Angular' }, { name: 'NestJS' }])),
      addFavorite: jasmine.createSpy('addFavorite').and.returnValue(of({})),
    };

    toastrServiceMock = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error'),
      warning: jasmine.createSpy('warning'),
    };

    await TestBed.configureTestingModule({
      imports: [SearchComponent, FormsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente Search', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir aviso ao tentar favoritar um repositório já existente', () => {
    apiServiceMock.addFavorite.and.returnValue(throwError(() => ({ error: { error: 'já foi favoritado antes' } })));

    component.addToFavorites('Angular');

    expect(toastrServiceMock.warning).toHaveBeenCalledWith(
      jasmine.stringMatching(/O repositório "<strong>Angular<\/strong>" já está nos favoritos!/),
      '',
      jasmine.any(Object)
    );
  });

  it('deve tratar erro ao favoritar um repositório', () => {
    apiServiceMock.addFavorite.and.returnValue(throwError(() => new Error('Erro ao favoritar')));

    component.addToFavorites('Angular');

    expect(toastrServiceMock.error).toHaveBeenCalledWith(
      jasmine.stringMatching(/Erro ao favoritar repositório. Tente novamente!/),
      '',
      jasmine.any(Object)
    );
  });

  it('deve tratar erro ao buscar repositórios', async () => {
    apiServiceMock.searchRepos.and.returnValue(throwError(() => new Error('Erro ao buscar')));

    component.query = 'Angular';
    component.search();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(toastrServiceMock.error).toHaveBeenCalledWith(
      jasmine.stringMatching(/Erro ao buscar/),
      '',
      jasmine.any(Object)
    );
  });
});