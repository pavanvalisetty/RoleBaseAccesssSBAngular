import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { UserlistingComponent } from './components/userlisting/userlisting.component';
import { EmpDisplayComponent } from './components/emp-display/emp-display.component';
import { EmpAddEditComponent } from './components/emp-add-edit/emp-add-edit.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthGuard } from './auth.guard';
import { Role } from './roles.enum';
import { AppComponent } from './app.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';



const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:UserLoginComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard],data:{expectedRole:Role.Admin}},
  {path:'register',component:RegisterComponent},
  {path:'user',component:UserLoginComponent},
  {path:'userlist',component:UserlistingComponent,canActivate:[AuthGuard],data:{expectedRole:Role.Admin}},
  {path:'empList',component:EmpDisplayComponent,canActivate:[AuthGuard]},
  {path:'empEdit',component:EmpAddEditComponent,canActivate:[AuthGuard]},
  {path:'unauthoirzed',component:UnauthorizedComponent,canActivate:[AuthGuard]},
  {path:'navbar',component:NavbarComponent},
  {path:'footer',component:FooterComponent},
  {path:'app-root',component:AppComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
