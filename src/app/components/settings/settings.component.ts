import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserStatus();
  }

  getUserStatus() {
    this.userService.status().subscribe();
  }

  update(formValues) {
    this.userService.update(this.userService.currentUser._id, formValues.userName).subscribe();
  }

}
