import { Component, OnInit } from '@angular/core';
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
  selector: 'app-update-salary',
  templateUrl: './update-salary.component.html',
  styleUrls: ['./update-salary.component.css']
})
export class UpdateSalaryComponent implements OnInit {

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

  salaryList: Salary[] = [];
  salary: Salary[] = [];
  selectedData: Salary[] = [{
    basicSalary: 0,
    bonus: 0,
    deduction: 0,
    employeeId: 0,
    invoiceDate: new Date(),
    modifiedBy: 0,
    month: '',
    name: '',
    remarks: '',
    salaryAmt: 0,
    salaryId: 0,
    year: ''
  }];

  date: Date = new Date();
  obj: any;
  month: number = 0;
  years: number[] = [];
  selectedMonth: any;
  selectedYear: number = 0;
  selectedEmp: string = "Mich Anderson";

  mapName: string[] = [];
  updateEmp: Salary[] = [];

  constructor(private salaryListService: SalaryListService, private updateSalaryService: UpdateSalaryService, private router: Router) { }

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

    this.retrieveSalList();
  }

  
  public retrieveSalList(): void{
    //debugger
    let user = sessionStorage.getItem("SessionId");
    if(Boolean(user)){
      this.salaryListService.retrieve().subscribe((res: any) => {
        this.salaryList = res.obj;
        //this.selectedData = this.salaryList;
        this.mapName = this.salaryList.map(item => item.name).filter((value, index, self) => self.indexOf(value) == index);
      });
    }
    else{
      this.router.navigate(['../login']);
    }
  }

  public updateSalary(): void{
    this.selectedData[0].month = this.selectedMonth.name;
    this.selectedData[0].year = this.selectedYear.toString();
    this.updateSalaryService.submit(this.selectedData).subscribe((res: any) => {
      //this.selectedData = this.salaryList;
      this.router.navigate(['../salary-list']);
    });
  }

  public getSalary(): void{
    debugger
    this.updateEmp = this.salaryList.filter(x => x.name == this.selectedEmp);
    this.salary = this.salaryList.filter(x => x.name == this.selectedEmp && x.month == this.selectedMonth.name && x.year == this.selectedYear.toString());
      if(this.salary.length == 0){
        this.selectedData = [{
          basicSalary: 0,
          bonus: 0,
          deduction: 0,
          employeeId: this.updateEmp[0].employeeId,
          invoiceDate: this.date,
          modifiedBy: 0,
          month: this.selectedMonth.name,
          name: this.selectedEmp,
          remarks: '',
          salaryAmt: 0,
          salaryId: 0,
          year: this.selectedYear.toString()
        }];
      }
      else{
        this.selectedData = this.salary;
      }
    
  }

  // public onSelect(){
  //   debugger
  //   this.selectedData = this.salaryList.filter(x => x.name === this.selected);
    
  // }

}
