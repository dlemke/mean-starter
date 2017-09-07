import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor(private userService: UserService, private router: Router) { }

  logout() {
    this.userService.logout().subscribe(resp => {

      if (resp) {
        this.router.navigate(['/logout']);
      }
      else {
        console.log('something went wrong....');
      }

    });
  }
}
