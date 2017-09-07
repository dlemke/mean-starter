import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private userService: UserService, private router: Router) { }

  register(formValues) {

    this.userService.register(formValues.userName, formValues.password)
      .subscribe(resp => {
        if (!resp) {
          console.log('an error occurred');
        }
        else {
          this.router.navigate(['']);
        }
      });
  }
}
