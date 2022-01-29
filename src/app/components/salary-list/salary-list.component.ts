import { Component, OnChanges, OnInit } from '@angular/core';
import { SalaryListService }  from 'src/app/service/salary-list/salary-list.service'; 
import { UpdateSalaryService }  from 'src/app/service/update-salary/update-salary.service'; 
import { Router } from '@angular/router';

interface Salary {
  basicSalary: number,
  bonus: number,
  deduction: number,
  employeeId: number,
  invoiceDate: Date,
  modifiedBy: number,
  month: string,
  name: string,
  remarks: string,
  salaryAmt: number,
  salaryId: number,
  year: string
}

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css']
})
export class SalaryListComponent implements OnInit {

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

  allSalaries: Salary[] = [];
  salaryList: Salary[] = [];
  salary: Salary[] = [];
  selectedData: Salary[] = [];
  isChecked: boolean = false;
  message: string = "";
  selected: string = "";

  obj: any;
  month: number = 0;
  years: number[] = [];
  selectedMonth: any;
  selectedYear: number = 0;
  norecord: string = "";

  constructor(private salaryListService: SalaryListService, private updateSalaryService: UpdateSalaryService, private router: Router) { }

  ngOnInit(): void {
    //default month
    // this.month = new Date().getMonth();
    // this.obj = this.allmonths.find(e => e.key == this.month);
    // this.selectedMonth = this.obj;
    this.selectedMonth = "All";
    
    //list of years
    this.selectedYear = new Date().getFullYear();
    for(let year = this.selectedYear; year >= 2021; year--){
      this.years.push(year);
    }

    this.retrieveSalList();
  }

  public retrieveSalList(): void{
    debugger
    let user = sessionStorage.getItem("SessionId");
    if(Boolean(user)){
      this.salaryListService.retrieve().subscribe((res: any) => {
        this.salaryList = res.obj;
        this.selectedData = this.salaryList;
        //this.allSalaries = res.obj;
      });
    }
    else{
      this.router.navigate(['../login']);
    }
  }

  public getSalary(): void{
    debugger
    if(this.selectedMonth === "All"){
      this.selectedData = this.salaryList;
      this.norecord = "";
    }
    else{
      this.salary = this.salaryList.filter(x => x.month == this.selectedMonth.name && x.year == this.selectedYear.toString());
      if(this.salary.length == 0){

        this.norecord = "No records found.";
        // this.selectedData = [{
        //   basicSalary: 0,
        //   bonus: 0,
        //   deduction: 0,
        //   employeeId: 0,
        //   invoiceDate: new Date(),
        //   modifiedBy: 0,
        //   month: '',
        //   name: '',
        //   remarks: '',
        //   salaryAmt: 0,
        //   salaryId: 0,
        //   year: ''
        // }];
      }
      else{
        this.selectedData = this.salary;
        this.norecord = "";
      }
    }
    
  }

  // public onSelect(){
  //   debugger
  //   console.log(JSON.stringify(this.selected));
  //   this.selectedData = this.salaries.filter(x => x.name === this.selected)
  // }
  // public updateSalary(): void{
  //   this.updateSalaryService.submit(this.selectedData).subscribe((res: any) => {
  //     this.selectedData = this.salaries;
  //     this.message = res.message;
  //   });
  // }

  public goToUpdateSalary(): void{
    this.router.navigate(["../update-salary"]);
  }
}
