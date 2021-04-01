import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from 'src/app/+state';
import { AuthService } from '../auth';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  accessGranted$ = this.authService.accessGranted$;
  collection$ = this.authFacade.collection$;
  username$ = this.authService.username$;

  constructor(
    private authService: AuthService,
    private authFacade: AuthFacade,
    public router: Router
  ) {}

  // tslint:disable-next-line: typedef
  open(menu: { openMenu: () => void }) {
    menu.openMenu();
  }

  logout(): void {
    this.authService.logout();
    this.authFacade.resetState();
  }
}
