import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProduct } from '../interface/product'
import { ICustomer } from './../interface/customer';
import { ILogin } from './../interface/login';

import { IUser } from './../interface/user';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;
  endPoint = 'http://localhost:3000/api/Users/login';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    }),
  };

  constructor(
    private _httpClient: HttpClient,
  ) { 
    
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<ILogin> {
    return this._httpClient.post<ILogin>(this.endPoint, {username: username, password: password})
    .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        console.log(user + "--in")
        return user;
      }));
    
  }

  public get currentUserValue(): IUser {
    console.log(this.currentUserSubject.value + "out")

        return this.currentUserSubject.value;
  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}