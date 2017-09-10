import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUserModel } from '../../models/IUserModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserStatus();
  }

  getUserStatus() {
    this.userService.status().subscribe();
  }
}
