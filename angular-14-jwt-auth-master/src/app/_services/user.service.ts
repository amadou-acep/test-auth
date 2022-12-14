import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';
const API_URL_WEB = 'http://localhost:8080/api/web/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // Add user
  addUser(username: string, email: string, password: string, role:string): Observable<any> {
    return this.http.post(
      API_URL_WEB + 'add_user',
      {
        username,
        email,
        password,
        role: [role]
      },
      httpOptions
    );
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getUsers(): Observable<any> {
    return this.http.get(API_URL_WEB + 'users', { responseType: 'json' });
  }

}
