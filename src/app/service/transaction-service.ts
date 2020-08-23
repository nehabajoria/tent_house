import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITransaction } from '../interface/transaction'

@Injectable({
  providedIn: 'root'
})

export class TransactionService {

  endPoint = 'http://localhost:3000/api/transactions';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    }),
  };

  constructor(
    private _httpClient: HttpClient,
  ) { }

  list(): Observable<ITransaction[]> {
    return this._httpClient.get<ITransaction[]>(this.endPoint);
  }

  getById(id: number): Observable<ITransaction> {
    return this._httpClient.get<ITransaction>(this.endPoint + "/" + id);
  }

  create(payload: ITransaction): Observable<ITransaction> {
    return this._httpClient.post<ITransaction>(this.endPoint, payload);
  }

  reverse(id: number, payload: ITransaction): Observable<ITransaction> {
    return this._httpClient.patch<ITransaction>(this.endPoint + "/" + id, payload);
  }

  save(id: number, payload: ITransaction): Observable<ITransaction> {
    return this._httpClient.patch<ITransaction>(this.endPoint + "/" + id, payload);
  }
  
}