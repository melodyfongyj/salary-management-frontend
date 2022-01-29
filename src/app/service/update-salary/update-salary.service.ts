import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/constant/constant';


@Injectable({
  providedIn: 'root'
})
export class UpdateSalaryService {

  constructor(private httpClient: HttpClient) { }

  public submit(salaries: any): Observable<any> {
    debugger
    const header = {'content-type': 'application/json'};
    const body = 
    { 
      // salaries
      'employeeId': salaries[0].employeeId,
      'name' : salaries[0].name,
      'basicSalary': salaries[0].basicSalary,
      'bonus': salaries[0].bonus,
      'deduction': salaries[0].deduction,
      'remarks': salaries[0].remarks,
      'salaryAmt': salaries[0].salaryAmt,
      'invoiceDate': salaries[0].invoiceDate,
      'month': salaries[0].month,
      'year': salaries[0].year
    };
    //call API to request obj
    return this.httpClient.post(AppConstants.APIAdminURL+"UpdateSalary", body, 
      { 
        headers: header,
        withCredentials: true
      }        
    );
  }
}
