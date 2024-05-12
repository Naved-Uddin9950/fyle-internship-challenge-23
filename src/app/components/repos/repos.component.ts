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
  loading: any;
  page: number = 1;
  per_page: number = 10;
  searchTerm: any = '';
  reposNumber: any;

  searchBar = this.formBuilder.group({
    searchTerm: '',
    reposNumber: 10
  });

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  searchUser(): void {
    this.searchTerm = this.searchBar.value.searchTerm;
    this.reposNumber = this.searchBar.value.reposNumber;
    
    if(typeof this.reposNumber === 'number') {
      this.per_page = this.reposNumber;
    } else if(typeof this.reposNumber === 'string') {
      this.per_page = parseInt(this.reposNumber);
    }

    console.log(this.per_page);
    if (this.searchTerm && typeof this.searchTerm === 'string') {
      this.fetchData(this.searchTerm);
    }
  }


  async fetchData(searchTerm: any): Promise<void> {
    try {
      this.loading = true;
      const userData = await this.apiService.getUser(searchTerm).toPromise();
      const repoData = await this.apiService.getRepo(searchTerm, this.page, this.per_page).toPromise();
      this.data = userData;
      this.repo = repoData;
    } catch (error) {
      console.error('Error fetching user/repos data:', error);
    } finally {
      this.loading = false;
      this.searchBar.reset();
    }
  }


  nextPage() {
    this.page++;
    this.fetchData(this.searchTerm);
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchData(this.searchTerm);
    }
  }

}
