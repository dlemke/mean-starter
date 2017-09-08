import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginInvalid: boolean;
  loginError: any;

  constructor(private userService: UserService, private router: Router) { }

  login(loginValues) {
    this.loginInvalid = false;
    this.userService.login(loginValues.userName, loginValues.password)
      .map((res, err) => {

        if (res && err === 0) {
          this.router.navigate(['']);
        }
        else {
          this.loginInvalid = true;
          this.loginError = res;
        }

      })
      .subscribe();
  }
}
