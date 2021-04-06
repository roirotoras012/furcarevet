import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { formatDate } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {


  constructor(private http: HttpClient) { }


notification(){
  
  return this.http.get("https://localhost/furcare/user/getschedule2")


}









}




