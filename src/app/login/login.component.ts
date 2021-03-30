import { Component } from '@angular/core';
import { AuthFacade } from 'src/app/+state';
import { LoginRequest } from 'src/app/shared/data-models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginError$ = this.authFacade.loginError$;
  loginLoading$ = this.authFacade.loginLoading$;
  constructor(private authFacade: AuthFacade) {}

  login(authenticate: LoginRequest): void {
    this.authFacade.loginSubmit(authenticate);
  }
}
