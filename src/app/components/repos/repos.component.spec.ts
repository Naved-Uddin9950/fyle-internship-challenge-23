import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ReposComponent } from './repos.component';
import { ApiService } from '../../services/api.service';

describe('ReposComponent', () => {
  let component: ReposComponent;
  let fixture: ComponentFixture<ReposComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReposComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [ApiService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReposComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user and repo data on searchUser', () => {
    const searchTerm = 'user123';
    const userData = {
      'name': searchTerm,
      'avatar_url': 'https://avatars.githubusercontent.com/u/119304160?v=4',
      'twitter_username': `https://twitter.com/${searchTerm}`,
      'bio': 'This is my bio',
      'location': 'Jaipur, Rajasthan (India)',
      'repos': {
        'todo-app': {
          'name': 'todo app',
          'desc': 'todo description here',
          'tags': ['JavaScript', 'TypeScript', 'ReactJS']
        }
      }
    };
    const repoData = [
      [
        {
          'name': 'Repo1',
          'description': 'This is description',
          'topics': ['JavaScript', 'TypeScript', 'HTML', 'CSS']
        },

        {
          'name': 'Repo2',
          'description': 'This is description 2',
          'topics': ['JavaScript', 'NodeJS', 'ExpressJS', 'EJS']
        },

        {
          'name': 'Repo3',
          'description': 'This is description 3',
          'topics': ['SpringBoot', 'Java', 'Angular', 'Tailwind CSS']
        }
      ]
    ];

    spyOn(apiService, 'getUser').and.returnValue(of(userData));
    spyOn(apiService, 'getRepo').and.returnValue(of(repoData));

    component.searchBar.setValue({ searchTerm, reposNumber: component.per_page });
    component.searchUser();

    expect(apiService.getUser).toHaveBeenCalledWith(searchTerm);
    expect(apiService.getRepo).toHaveBeenCalledWith(searchTerm, component.page, component.per_page);
    expect(component.data).toEqual(userData);
    expect(component.repo).toEqual(repoData);
  });

  // Add more test cases as needed
});
