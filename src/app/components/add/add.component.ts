import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddService } from 'src/app/service/add/add.service';
import { GetEmpService } from 'src/app/service/get-emp/get-emp.service';

interface empDetails{
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  dateOfBirth: Date;
  age: number;
  address: string;
  personalId: string;
  //work
  accessLevel: number;
  jobTitle: string;
  departmentName: string;
  startDate: Date;
  endDate: Date;  
  //salary 1:1
  basicSalary: number;
  bonus: number;
  deduction: number;
  remarks: string;
  salaryAmt: number;
  bankDetail: [
    {
      bankDetailId: number,
      bankName: string,
      branchCode: string,
      accountNo: string,
      accountStatus: number,
    }
  ];
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
  empDetails: empDetails = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    dateOfBirth: new Date(),
    age: 0,
    address: '',
    personalId: '',
    accessLevel: 1,
    jobTitle: '',
    departmentName: '',
    startDate: new Date(),
    endDate: new Date(),
    basicSalary: 0,
    bonus: 0,
    deduction: 0,
    remarks: '',
    salaryAmt: 0,
    bankDetail: [
      {
        bankDetailId: 0,
        bankName: '',
        branchCode: '',
        accountNo: '',
        accountStatus: 0
      }
    ]
  };

  notif: string = "";
  message: string = "";

  constructor(private addService: AddService, private getEmpService: GetEmpService, private router: Router) { }

  ngOnInit(): void {
  }

  public addRow(){
    this.empDetails.bankDetail.push({ bankDetailId: 0, bankName:'', branchCode:'', accountNo: '', accountStatus: 0});
  }

  public delete(index: number){
    this.empDetails.bankDetail.splice(index, 1);
  }

  public submit(): void{
    this.addService.submit(this.empDetails).subscribe((res: any) => {
    alert(res.message);
    this.router.navigate(["../admin"]);
    });
  }

  // public calcAge():void{
  //   let ageDiff = Math.abs(Date.now() - this.empDetails.dateOfBirth.getTime());
  //   this.empDetails.age = Math.floor((ageDiff / (1000 * 3600 * 24))/365.25);
  // }
}
