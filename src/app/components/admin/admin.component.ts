import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin/admin.service';
import { Router } from '@angular/router';

interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  departmentName: string;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})



export class AdminComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveEmpList();
  }

  public retrieveEmpList(): void{
    //debugger
    let user = sessionStorage.getItem("SessionId");
    if(Boolean(user)){
      this.adminService.retrieve().subscribe((res: any) => {
        this.employees = res.obj;
      });
    }
    else{
      this.router.navigate(['../login']);
    }
  }

  public goToAddEmployee(): void{
    this.router.navigate(['../add-employee']);
  }
  
  public goToSalaryList(): void{
    this.router.navigate(['../salary-list']);
  }

  public goToEmpProfile(email: string): void{
    debugger
    sessionStorage.setItem("EmpSession", email);
    this.router.navigate(['../profile']);
  }

}
