import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_USUARIOS = "https://api.github.com/search/users?q=" 
  private API_USER = "https://api.github.com/users/" 
  

  constructor(private http: HttpClient) { }

  public getAllPeople(data: string): Observable<any>{    
    return this.http.get(this.API_USUARIOS + data);
    }

  public getPeople(data: string): Observable<any>{    
    return this.http.get(this.API_USER + data);
    }
  
    
  public Score() {
    return localStorage.getItem('Score');
  }

  public loggout() {
    localStorage.removeItem('Score');
  }


}
