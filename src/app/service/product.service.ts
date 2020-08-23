import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProduct } from '../interface/product'

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  endPoint = 'http://localhost:3000/api/products';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    }),
  };

  constructor(
    private _httpClient: HttpClient,
  ) { }

  list(): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>(this.endPoint);
  }

  getById(id: number): Observable<IProduct> {
    return this._httpClient.get<IProduct>(this.endPoint + "/" + id);
  }

  create(payload: IProduct): Observable<IProduct> {
    return this._httpClient.post<IProduct>(this.endPoint, payload);
  }

  save(id: number, payload: IProduct): Observable<IProduct> {
    return this._httpClient.patch<IProduct>(this.endPoint + "/" + id, payload);
  }

  put(id: number, quantity: number): Observable<IProduct> {
    return this._httpClient.put<IProduct>(this.endPoint + "/" + id, quantity);
  }

  deleteById(id: number): Observable<any> {
    return this._httpClient.delete<any>(this.endPoint + "/" + id);
  }
}