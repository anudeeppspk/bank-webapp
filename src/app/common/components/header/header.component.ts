import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStorageService } from 'src/app/services/auth-storage/auth-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authStorageService: AuthStorageService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authStorageService.removeAuthIdentity();
    this.router.navigate(['login'])
  }

}
