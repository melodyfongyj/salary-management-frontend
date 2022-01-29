import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AddComponent } from './components/add/add.component';
import { SalaryListComponent } from './components/salary-list/salary-list.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UpdateSalaryComponent } from './components/update-salary/update-salary.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ChangePasswordComponent,
    AddComponent,
    SalaryListComponent,
    EmployeeProfileComponent,
    NavBarComponent,
    UpdateSalaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
