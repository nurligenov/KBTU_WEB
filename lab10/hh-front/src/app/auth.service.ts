import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://127.0.0.1:8000/jwt/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
 }
  constructor(private http: HttpClient,) {}
    
   register(username:string, email:string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + 'register/', {user: {username, email, password}}, this.httpOptions);
  }
  login(username:string, email:string, password: string, token:string): Observable<any> {
    return this.http.post(this.baseUrl + 'login/', {user: {username, email, password, token}}, this.httpOptions);
  }
}
