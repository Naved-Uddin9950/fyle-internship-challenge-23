import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent {
  data: any;
  repo: any;
  // loading = true;
  loading: boolean = false;

  searchBar = this.formBuilder.group({
    searchTerm: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  async searchUser(): Promise<void> {
    const searchTerm = this.searchBar.value.searchTerm;
    if (searchTerm && typeof searchTerm === 'string') {
      try {
        this.loading = true;
        const userData = await this.apiService.getUser(searchTerm).toPromise();
        const repoData = await this.apiService.getRepo(searchTerm).toPromise();
        if(this.data) {
          this.loading = false;
        }
        this.data = userData;
        this.repo = repoData;
      } catch (error) {
        console.error('Error fetching user/repos data:', error);
      } finally {
        this.loading = false;
        this.searchBar.reset();
      }
    }
  }
}
