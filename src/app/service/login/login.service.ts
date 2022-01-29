import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  constructor(private httpClient: HttpClient) { }

  public login(username: string, password: string): Observable<any> {
    const header = {'content-type': 'application/json'};
    const body = 
    { 
      "email": username, 
      "password": password 
    };
    //call API to login
    return this.httpClient.post(AppConstants.APIBaseURL+"Login", body, 
      { 
        headers: header,
        withCredentials: true
      }        
    );
  }

  public logout(username: any): Observable<any> {
    const header = {'content-type': 'application/json'};
    const body = 
    { 
      "email": username
    };
    //call API to login
    return this.httpClient.post(AppConstants.APIBaseURL+"Logout", body, 
      { 
        headers: header,
        withCredentials: true
      }        
    );
  }

}
