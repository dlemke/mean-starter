import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registrationInvalid: boolean;
  regError: any;

  constructor(private userService: UserService, private router: Router) { }

  register(formValues) {

    this.registrationInvalid = false;

    this.userService.register(formValues.userName, formValues.password)
      .map((err, res) => {
        this.regError = err;
      })
      .subscribe(response => {
        if (!response) {
          this.registrationInvalid = true;
        }
        else {
          this.router.navigate(['']);
        }
      });
  }
}
