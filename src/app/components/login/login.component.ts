import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  message: string = "";

  constructor(private loginService: LoginService, private router: Router) {  }

  ngOnInit(): void {
  }

  public login(): void{
    if(this.username=="" || this.password==""){
      this.message = "Please enter username and password.";
    }
    else{
      this.loginService.login(this.username, this.password).subscribe((res: any) => {
          debugger
          if(res.status == 1){
            sessionStorage.setItem("SessionId", this.username);
            this.router.navigate(['../admin']);
          }
          else if(res.status == 2){
            sessionStorage.setItem("SessionId", this.username);
            this.router.navigate(['../profile']);
          }
          else{
            this.message = res.message;
          }
      });
    }

  }
  
}
