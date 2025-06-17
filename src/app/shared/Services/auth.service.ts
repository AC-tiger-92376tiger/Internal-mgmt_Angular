import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Ensure this is provided in the root injector
})
export class AuthService {
  private baseUrl = 'http://localhost:5259/api/Auth';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    //console.log(data);
    return this.http.post(`${this.baseUrl}/Register`, data);
  }

  login(data: any): Observable<any> {
    console.log(data);
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  //private loginuser: any = null;

  // setLoginUser(user: any): void {
  //   this.loginuser = user;
  // }

  // getLoginUser(): any {
  //   return this.loginuser;
  // }
}
