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
    console.log(formValues);
    // currently not being hit.
    // TODO: When updating users, sessions are being dropped... meaning user is logged out. Need to work around this.
    // Passport Issue: https://github.com/jaredhanson/passport/issues/208
    this.userService.update(this.userService.currentUser._id, formValues.userName).subscribe();
  }

}
