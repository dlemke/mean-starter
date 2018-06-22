import { Injectable } from '@angular/core';
import { IUserModel } from '../models/IUserModel';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

const headers = new Headers({ 'Content-Type': 'application/json' });
const options = new RequestOptions({ headers: headers });

@Injectable()
export class UserService {
  currentUser: IUserModel;

  constructor(private http: Http) {}

  register(userName: string, password: string) {
    const registrationInfo = { username: userName, password: password };

    return this.http
      .post('/api/users/register', JSON.stringify(registrationInfo), options)
      .do(response => {
        if (response) {
          this.currentUser = <IUserModel>response.json();
        }
      })
      .catch(this.handleError);
  }

  login(userName: string, password: string) {
    const loginInfo = { username: userName, password: password };

    return this.http
      .post('/api/users/login', JSON.stringify(loginInfo), options)
      .do(response => {
        if (response) {
          this.currentUser = <IUserModel>response.json();
        }
      })
      .catch(this.handleError);
  }

  update(user_id, userName: string) {
    const updateInfo = { username: userName };

    return this.http
      .put('/api/users/update/' + user_id, JSON.stringify(updateInfo), options)
      .do(response => {
        if (response) {
          this.currentUser = <IUserModel>response.json();
        }
      })
      .catch(this.handleError);
  }

  status() {
    return this.http
      .get('/api/users/status')
      .map((response: any) => {
        if (response._body) {
          return response.json();
        } else {
          return {};
        }
      })
      .do(currentUser => {
        if (!!currentUser.userName) {
          this.currentUser = currentUser;
        }
      });
  }

  logout() {
    this.currentUser = undefined;
    return this.http.get('/api/users/logout', {});
  }

  private handleError(error: Response) {
    return Observable.of(false, error.json());
  }
}
