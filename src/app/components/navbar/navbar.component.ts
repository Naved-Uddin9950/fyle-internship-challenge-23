import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  searchBar = this.formBuilder.group({
    searchTerm: ''
  });

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  searchUser(): void {
    let searchValue = this.searchBar.value.searchTerm;
    console.log(`You searched ${searchValue}`);
    this.searchBar.reset();
  }
}
