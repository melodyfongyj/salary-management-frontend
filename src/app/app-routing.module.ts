import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { AdminComponent } from './components/admin/admin.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { LoginComponent } from './components/login/login.component';
import { SalaryListComponent } from './components/salary-list/salary-list.component';
import { UpdateSalaryComponent } from './components/update-salary/update-salary.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: "full"
  },
  { path: 'login',component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: "change-password", component: ChangePasswordComponent },
  { path: "add-employee", component: AddComponent },
  { path: "salary-list", component: SalaryListComponent },
  { path: "profile", component: EmployeeProfileComponent },
  { path: "update-salary", component: UpdateSalaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
