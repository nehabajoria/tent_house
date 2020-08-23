import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomer } from './../interface/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  endPoint = 'http://localhost:3000/api/customers';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    }),
  };

  constructor(
    private _httpClient: HttpClient,
  ) { }

  list(): Observable<ICustomer[]> {
    return this._httpClient.get<ICustomer[]>(this.endPoint);
  }

  getById(id: number): Observable<ICustomer> {
    return this._httpClient.get<ICustomer>(this.endPoint + "/" + id);
  }

  create(payload: ICustomer): Observable<ICustomer> {
    return this._httpClient.post<ICustomer>(this.endPoint, payload);
  }

  save(id: number, payload: ICustomer): Observable<ICustomer> {
    return this._httpClient.patch<ICustomer>(this.endPoint + "/" + id, payload);
  }

  deleteById(id: number): Observable<any> {
    return this._httpClient.delete<any>(this.endPoint + "/" + id);
  }


}