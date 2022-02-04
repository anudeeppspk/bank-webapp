import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  showHeaderFooter = false;

  toggleHeaderFooter(url: string) {
    if (url.includes('login') || url.includes('signup') || url.includes('forgotPassword')) {
      this.showHeaderFooter = false;
    } else {
      this.showHeaderFooter = true;
    }
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.toggleHeaderFooter(event.urlAfterRedirects)
    });
  }

}
