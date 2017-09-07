import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginInvalid: boolean = false;
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login(formValues) {
    this.userService.authenticateUser(formValues.userName, formValues.password)
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
