import { Injectable } from '@angular/core';
import { Observable, map } from "rxjs";
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User, UserResponse } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{
  url:string;
  endpoint = environment.apiUrl;

  constructor(protected http:HttpClient) { 
      this.url =`${this.endpoint}/User`;

  }
  getUsers(): Observable<UserResponse>{
    return this.http.get<UserResponse>(`${this.url}`)
  }

  postUsers(user: User): Observable<User>{
    return this.http.post<User>(`${this.url}`, user)
  }

  putUsers(user: User): Observable<User>{
    return this.http.put<User>(`${this.url}/${user.id}`, user)
  }

  deleteUser(id: number): Observable<User>{
    return this.http.delete<User>(`${this.url}/${id}`)
  }}
