import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Iuser } from '../../core/interfaces/user';
import { SharedService } from '../../core/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private sharedService: SharedService,
  ) {

  }
  searchForm !: FormGroup

  user !: Iuser



  ngOnInit(): void {
    const user: Iuser = JSON.parse(localStorage.getItem('user') as string);
    this.user = user;
  }

  viewSidebar(value: boolean) {
    this.sharedService.toggleSidebar(value);
  }

  profileUpdate() {
    this.sharedService.setProfileData(this.user);
    this.router.navigate(['auth/signup']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['auth']);
  }
}
