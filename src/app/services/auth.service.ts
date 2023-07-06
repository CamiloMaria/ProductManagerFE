import { Injectable } from '@angular/core';
import { Observable, map } from "rxjs";
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class authService
{
  url:string;
  endpoint = environment.apiUrl;

  constructor(protected http:HttpClient) { 
      this.url =`${this.endpoint}/User`;

  }
  getUser(user: string, password: string): Observable<User>{
    const body = { id:0, name: user, password:password, rol:'string' };
    return this.http.post<User>(`${this.url}/GetRol`, body)
  }
}