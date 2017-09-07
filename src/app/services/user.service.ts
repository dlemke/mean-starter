import { Injectable } from '@angular/core';
import { IUserModel } from '../models/IUserModel';
import { Observable } from 'rxjs/RX';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {
  currentUser: IUserModel;

  constructor(private http: Http) { }

  register(userName: string, password: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let registerInfo = { UserName: userName, Password: password };

    return this.http.post('api/register', JSON.stringify(registerInfo), options)
      .do(resp => {
        if (resp) {
          this.currentUser = <IUserModel>resp.json();
        }
      }).catch(error => {
        return Observable.of(false);
      });
  }

  authenticateUser(userName: string, password: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let loginInfo = { UserName: userName, Password: password };

    return this.http.post('api/login', JSON.stringify(loginInfo), options)
      .do(resp => {
        if (resp) {
          this.currentUser = <IUserModel>resp.json();
        }
      }).catch(error => {
        return Observable.of(false);
      });
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  checkStatus() {
    return this.http.get('api/status')
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
      }).subscribe();
  }

  logout() {
    let logoutInfo = { UserName: this.currentUser.userName, Password: '' };
    this.currentUser = undefined;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('api/logout', JSON.stringify(logoutInfo), options);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
