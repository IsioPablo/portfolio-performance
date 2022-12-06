import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StockPosition } from '../models/stockPosition';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  baseUrl = 'https://localhost:5001/api';
  
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<StockPosition[]>(this.baseUrl + '/StockPositions');
  }
}
