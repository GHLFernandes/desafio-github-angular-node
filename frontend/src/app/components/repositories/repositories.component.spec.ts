import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoriesComponent } from './repositories.component';
import { ApiService } from '../../services/api.service';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('RepositoriesComponent', () => {
  let component: RepositoriesComponent;
  let fixture: ComponentFixture<RepositoriesComponent>;
  let apiServiceMock: any;

  beforeEach(async () => {
    apiServiceMock = {
      getMyRepos: jasmine.createSpy('getMyRepos').and.returnValue(of([{ name: 'Repo 1' }, { name: 'Repo 2' }])),
    };

    await TestBed.configureTestingModule({
      imports: [RepositoriesComponent],
      providers: [
        provideHttpClient(),
        { provide: ApiService, useValue: apiServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente Repositories', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir a lista de repositórios', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('li').length).toBe(2);
  });
});
