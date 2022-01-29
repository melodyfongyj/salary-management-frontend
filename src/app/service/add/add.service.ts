import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class AddService {

  constructor(private httpClient: HttpClient) { }

  public submit(empDetails: any): Observable<any> {
    debugger
    const header = {'content-type': 'application/json'};
    const body = 
    { 
      'firstName': empDetails.firstName,
      'lastName' : empDetails.lastName,
      'email': empDetails.email,
      'mobileNo': empDetails.mobileNo,
      'dateOfBirth': empDetails.dateOfBirth,
      'age': empDetails.age,
      'address': empDetails.address,
      'personalId': empDetails.personalId,
      'employeeId': empDetails.employeeId,
      'accessLevel': empDetails.accessLevel,
      'jobTitle': empDetails.jobTitle,
      'departmentName': empDetails.departmentName,
      'startDate': empDetails.startDate,
      'endDate': empDetails.endDate,
      'bankDetail': [
        {
          'bankName': empDetails.bankDetail.bankName,
          'branchCode': empDetails.bankDetail.branchCode,
          'accountNo': empDetails.bankDetail.accountNo,
          'accountStatus': empDetails.bankDetail.accountStatus,
        }
      ],
      'salary':[
        {
          'basicSalary': empDetails.basicSalary,
          'bonus': empDetails.bonus,
          'deduction': empDetails.deduction,
          'remarks': empDetails.remarks,
          'salaryAmt': empDetails.salaryAmt,
        }
      ]
    };
    //call API to request obj
    return this.httpClient.post(AppConstants.APIBaseURL+"Add", body, 
      { 
        headers: header,
        withCredentials: true
      }        
    );
  }
}
