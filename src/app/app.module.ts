import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserlistingComponent } from './components/userlisting/userlisting.component';
import { UpdatepopupComponent } from './components/updatepopup/updatepopup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MaterialModule} from 'src/material.module';
import { EmpAddEditComponent } from './components/emp-add-edit/emp-add-edit.component';
import { EmpDisplayComponent } from './components/emp-display/emp-display.component';
import { FooterComponent } from './components/footer/footer.component'
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './service/auth.service';
import { TokenInterceptor } from './token.intercepter';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


export function tokenGetter(){

  return localStorage.getItem('authToken');
}

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserlistingComponent,
    UpdatepopupComponent,
    NavbarComponent,
    EmpAddEditComponent,
    EmpDisplayComponent,
    FooterComponent,
    UnauthorizedComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
    ToastrModule.forRoot(),
    MaterialModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains:['http://localhost:8006'],
        disallowedRoutes:['api url.com/login'] // replace with api login
      }
    })

    
  ],
  providers: [AuthGuard,AuthService,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
