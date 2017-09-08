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
    let registrationInfo = { username: userName, password: password };

    return this.http.post('/api/users/register', JSON.stringify(registrationInfo), options)
      .map((response: Response) => { return <IUserModel>response.json(); })
      .catch(this.handleError);
  }

  login(userName: string, password: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let loginInfo = { username: userName, password: password };

    return this.http.post('/api/users/login', JSON.stringify(loginInfo), options)
      .map((response: Response) => { return <IUserModel>response.json(); })
      .catch(this.handleError);
  }

  status() {
    return this.http.get('/api/users/status')
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
    this.currentUser = undefined;
    return this.http.get('/api/users/logout', {});
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
