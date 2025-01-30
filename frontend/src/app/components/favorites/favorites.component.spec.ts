import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let apiServiceMock: any;

  beforeEach(async () => {
    apiServiceMock = {
      getFavorites: jasmine.createSpy('getFavorites').and.returnValue(of([{ name: 'Express' }, { name: 'Fastify' }])),
    };

    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [{ provide: ApiService, useValue: apiServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente Favorites', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir a lista de favoritos', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('li').length).toBe(2);
  });
});
