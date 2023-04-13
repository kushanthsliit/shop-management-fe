import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'http://localhost:8080/api/shop/';

  constructor(private http: HttpClient) { }

  getAllRecords(){
    // let headers= new HttpHeaders()
    // .set('Content-Type', 'application/json')
    // .set('Access-Control-Allow-Origin', '*')
    return this.http.get<any>(this.baseUrl + 'get-all-records');
  }

  addRecord(data : any){
    return this.http.post<any>(this.baseUrl + 'add-record', data,
    {headers : new HttpHeaders().set('Content-Type', 'application/json')})
  }

  deleteRecord(id : number){
    return this.http.delete<any>(this.baseUrl + 'delete/id/' + id);
  }

  getSummaryBetweenDates(startDate: any, endDate: any){
    return this.http.get<any>(this.baseUrl + 'summary/startDate/' + startDate + '/endDate/' + endDate);
  }

  getRecordsByDateRange(startDate: any, endDate: any){
    return this.http.get<any>(this.baseUrl + 'getRecordsByDateRange/startDate/' + startDate + '/endDate/' + endDate);
  }

  getChartData(){
    return this.http.get<any>(this.baseUrl + 'chartData');
  }

}
