import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  userId: any;
  constructor(private authService: AuthService, private _dailog: MatDialog, private _empservice: EmployeeServiceService, private router: Router) {

  }

  onLogout(event: any) {

  }

  logoutProcess() {
    this.userId = localStorage.getItem(`userId`);
    console.log(" user logout" + this.userId);
    var token = this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
