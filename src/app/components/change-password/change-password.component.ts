import { Component, OnInit } from '@angular/core';
import { ChangePasswordService } from 'src/app/service/change-password/change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  username: string = "";
  password: string = "";
  confirm: string = "";
  message: string = "";

  constructor(private changePasswordService:ChangePasswordService) { }

  ngOnInit(): void {
  }

  public changePassword():void{
    if(this.username=="" || this.password=="" || this.confirm==""){
      this.message = "Please enter username and password.";
    }
    else{
      this.changePasswordService.change(this.username, this.password).subscribe((res: any) => {
        debugger
        if(res.status=='Ok'){
          this.message = res.message;
          this.username = "";
          this.password = "";
          this.confirm = "";
        }
        else {
          this.message = res.message;
        }
      });
    }
    
  }

}
