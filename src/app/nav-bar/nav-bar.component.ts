import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  showBack: boolean = true;
  showLogout: boolean = false;
  user: any = "";

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if((this.router.url == "/admin")){
      this.showBack = false;
    }
    if(sessionStorage.getItem("SessionId")!="mich@gmail.com" && this.router.url == "/profile"){
      this.showBack = false;
    }
    if(Boolean(sessionStorage.getItem("SessionId"))){
      this.showLogout = true;
    }
  }

  public back():void{
    if(this.router.url == "/update-salary"){
      this.router.navigate(["../salary-list"]);
    }
    else{
      this.router.navigate(["../admin"]);
    }
    
  }

  public logout():void{
    debugger
    if(Boolean(sessionStorage.getItem("SessionId"))){
      this.user = sessionStorage.getItem("SessionId");
    }
    this.loginService.logout(this.user).subscribe((res: any) => {
      if(res.status == "Out"){
        sessionStorage.removeItem("SessionId");
        sessionStorage.removeItem("EmpSession");
        this.router.navigate(['../login']);
      }
      else{
        this.router.navigate(['../login']);
      }
    });
  }

}
