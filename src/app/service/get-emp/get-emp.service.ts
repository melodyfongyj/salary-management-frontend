import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/constant/constant';

interface bankDetail{
    bankDetailId: number,
    bankName: string,
    branchCode: string,
    accountNo: string,
    accountStatus: number,
}

@Injectable({
  providedIn: 'root'
})
export class GetEmpService {

  bankDetail: bankDetail[] = [];

  constructor(private httpClient: HttpClient) { }

  public retrieve(username: any): Observable<any> {
    debugger
    const header = {'content-type': 'application/json'};
    const body = 
    { 
       "email": username
    };
    //call API to request obj
    return this.httpClient.post(AppConstants.APIBaseURL+"Profile", body, 
      { 
        headers: header,
        withCredentials: true
      }        
    );
  }

  public submit(empDetails: any): Observable<any> {
    debugger
    this.bankDetail = empDetails.bankDetail;
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
      'personalID': empDetails.personalID,
      'employeeId': empDetails.employeeId,
      'accessLevel': empDetails.accessLevel,
      'jobTitle': empDetails.jobTitle,
      'departmentName': empDetails.departmentName,
      'startDate': empDetails.startDate,
      'endDate': empDetails.endDate,
      'basicSalary': empDetails.basicSalary,
      'bonus': empDetails.bonus,
      'deduction': empDetails.deduction,
      'remarks': empDetails.remarks,
      'salaryAmt': empDetails.salaryAmt,
      'bankDetail': this.bankDetail
    };
    //call API to request obj
    return this.httpClient.post(AppConstants.APIBaseURL+"UpdateEmployee", body, 
      { 
        headers: header,
        withCredentials: true
      }        
    );
  }

  public delete(bankDetailId: number): Observable<any> {
    debugger
    const header = {'content-type': 'application/json'};
    const body = 
    { 

    };
    //call API to request obj
    return this.httpClient.post(AppConstants.APIBaseURL+"DeleteBankDetail?id="+bankDetailId, body, 
      { 
        headers: header,
        withCredentials: true
      }        
    );
  }
}

