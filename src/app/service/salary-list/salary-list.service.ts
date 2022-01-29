import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class SalaryListService {

  constructor(private httpClient: HttpClient) { }

  public retrieve(): Observable<any> {
    const header = {'content-type': 'application/json'};
    const body = { };
    //call API to request obj
    return this.httpClient.post(AppConstants.APIAdminURL+"SalaryList", body, 
      { 
        headers: header,
        withCredentials: true
      }        
    );
  }
}
