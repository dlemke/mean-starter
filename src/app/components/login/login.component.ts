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

  constructor(private userService: UserService, private router: Router) { }

  login(loginValues) {

    this.loginInvalid = false;

    this.userService.login(loginValues.userName, loginValues.password)
      .subscribe(resp => {
        if (!resp) {
          this.loginInvalid = true;
        }
        else {
          this.router.navigate(['']);
        }
      });
  }
}
