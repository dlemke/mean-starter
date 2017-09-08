import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginInvalid: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  login(loginFormValues) {

    this.userService.login(loginFormValues.userName, loginFormValues.password)
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
