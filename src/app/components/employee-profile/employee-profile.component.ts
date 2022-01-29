import { Component, OnInit } from '@angular/core';
import { GetEmpService } from 'src/app/service/get-emp/get-emp.service';
import { Router } from '@angular/router';

interface empDetails{
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  dateOfBirth: Date;
  age: number;
  address: string;
  personalID: string;
  //work
  employeeId: number;
  accessLevel: number;
  jobTitle: string;
  departmentName: string;
  startDate: Date;
  endDate: Date;  
  //salary 1:1
  salary: [
    {
      basicSalary: number,
      bonus: number,
      deduction: number,
      employeeId: number,
      invoiceDate: Date,
      modifiedBy: number,
      month: string,
      remarks: string,
      salaryAmt: number,
      salaryId: number,
      year: string
    }
  ];
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

interface salary {
  basicSalary: number,
  bonus: number,
  deduction: number,
  employeeId: number,
  invoiceDate: Date,
  modifiedBy: number,
  month: string,
  remarks: string,
  salaryAmt: number,
  salaryId: number,
  year: string
}

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  allmonths = [
    { name: 'Jan', key: 0 },
    { name: 'Feb', key: 1 },
    { name: 'Mar', key: 2 },
    { name: 'Apr', key: 3 },
    { name: 'May', key: 4 },
    { name: 'Jun', key: 5 },
    { name: 'Jul', key: 6 },
    { name: 'Aug', key: 7 },
    { name: 'Sep', key: 8 },
    { name: 'Oct', key: 9 },
    { name: 'Nov', key: 10 },
    { name: 'Dec', key: 11 },
  ];

  empDetails: empDetails = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    dateOfBirth: new Date(),
    age: 0,
    address: '',
    personalID: '',
    employeeId: 0,
    accessLevel: 1,
    jobTitle: '',
    departmentName: '',
    startDate: new Date(),
    endDate: new Date(),
    salary: [
      {
        basicSalary: 0,
        bonus: 0,
        deduction: 0,
        employeeId: 0,
        invoiceDate: new Date,
        modifiedBy: 0,
        month: '',
        remarks: '',
        salaryAmt: 0,
        salaryId: 0,
        year: ''
      }
    ],
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

  bankDetail: empDetails["bankDetail"][] = [];
  isReadonly: boolean = true;

  salaries: salary[] = [];
  salary: salary[] = [];
  selectedSal: salary[] = [{
    basicSalary: 0,
    bonus: 0,
    deduction: 0,
    employeeId: 0,
    invoiceDate: new Date(),
    modifiedBy: 0,
    month: '',
    remarks: '',
    salaryAmt: 0,
    salaryId: 0,
    year: ''
  }];
  
  month: number = 0;
  obj: any;
  selectedMonth: any;
  years: number[] = [];
  selectedYear: number = 0;
  norecord: string = "";

  constructor(private getEmpService: GetEmpService, private router: Router) { 
    
  }

  ngOnInit(): void {
    

    //default month
    this.month = new Date().getMonth();
    this.obj = this.allmonths.find(e => e.key == this.month);
    this.selectedMonth = this.obj;
    
    //list of years
    this.selectedYear = new Date().getFullYear();
    for(let year = this.selectedYear; year >= 2021; year--){
      this.years.push(year);
    }

    this.getEmpData();
  }

  public getEmpData(): void{
    debugger
    let user = sessionStorage.getItem("SessionId");
    let admin = sessionStorage.getItem("EmpSession");
      if(Boolean(admin)){
        this.getEmpService.retrieve(admin).subscribe((res: any) => {
          this.empDetails = res.obj[0];
          this.isReadonly = false;
          this.salaries = this.empDetails.salary;
          this.selectedSal = this.salaries;
        });
      }
      else{
        this.getEmpService.retrieve(user).subscribe((res: any) => {
          this.empDetails = res.obj[0];
          this.salaries = this.empDetails.salary;
          this.selectedSal = this.salaries;
        });
      }
  }

  public getSalary(): void{
    debugger
    this.salary = this.salaries.filter(x => x.month == this.selectedMonth.name && x.year == this.selectedYear.toString());
    if(this.salary.length == 0){
      this.norecord = "No records found.";
      // this.selectedSal = [{
      //   basicSalary: 0,
      //   bonus: 0,
      //   deduction: 0,
      //   employeeId: 0,
      //   invoiceDate: new Date(),
      //   modifiedBy: 0,
      //   month: '',
      //   remarks: '',
      //   salaryAmt: 0,
      //   salaryId: 0,
      //   year: ''
      // }];
    }
    else{
      this.selectedSal = this.salary;
      this.norecord = "";
    }
  }
  public addRow(): void{
    this.empDetails.bankDetail.push({ bankDetailId: 0, bankName:'', branchCode: '', accountNo: '', accountStatus: 0});
  }

  public delete(index: number): void{
    debugger
    let id = this.empDetails.bankDetail[index].bankDetailId;
    this.getEmpService.delete(id).subscribe((res: any) => {
      this.empDetails.bankDetail.splice(index, 1);
    });
  }
  
  public submit(): void{
    debugger
    let admin = sessionStorage.getItem("EmpSession");
    if(Boolean(admin)){
      this.getEmpService.submit(this.empDetails).subscribe((res: any) => {
        if(this.empDetails.accessLevel === 0){
          alert("Employee account has been deactivated.");
        }
        else{
          alert(res.message);
          this.router.navigate(['../admin']);
        }
      });
    }
    else{
      this.getEmpService.submit(this.empDetails).subscribe((res: any) => {
        alert(res.message);
        this.router.navigate(['../profile']);
      });
    }
    
  }

}
