import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUserModel } from '../../models/IUserModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private userService: UserService) { }

  getUserStatus() {
    this.userService.status().subscribe();
  }
}
