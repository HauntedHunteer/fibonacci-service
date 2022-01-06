import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {FibModel} from "./fib-model";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  sendFibIndex(fibModel : FibModel): Observable<FibModel> {
    return this.httpClient.post<FibModel>('http://localhost:8080/api/fib-value', fibModel, httpOptions);
  }

  getAllEnteredFibIndexes(): Observable<FibModel[]> {
    return this.httpClient.get<FibModel[]>('http://localhost:8080/api/fib-value/all', httpOptions);
  }

  getCalculatedValues(): Observable<FibModel[]> {
    return this.httpClient.get<FibModel[]>('http://localhost:8080/api/fib-value/values', httpOptions);
  }
}
