import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { UserComponent } from './home/user/user.component';
import { TableComponent } from "./home/table/table.component";
import { AuthGuard } from "../app/guard/auth.guard";

const routes: Routes = [
  {    path: '',    component: LoginComponent,    pathMatch: 'full',  },    
  {    path: 'User',    component: UserComponent,    pathMatch: 'full',  },  
  {    path: 'User/:login',    component: UserComponent,    pathMatch: 'full' },  
  {    path: 'Table',    component: TableComponent,    pathMatch: 'full' },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
