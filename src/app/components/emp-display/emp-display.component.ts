import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { AuthService } from 'src/app/service/auth.service';
import { Global } from 'src/GlobalVar';

@Component({
  selector: 'app-emp-display',
  templateUrl: './emp-display.component.html',
  styleUrls: ['./emp-display.component.css']
})
export class EmpDisplayComponent implements OnInit {
  [x: string]: any;

  //displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'company', 'dob2', 'experience', 'package1', 'action'];
  displayedColumns: string[] = ['id', 'username','name', 'email', 'phone','roles','action'];
  //displayedColumns: string[] = ['id', 'firstName', 'lastName','email', 'company', 'dob', 'experience', 'package1' ];
  empList!: MatTableDataSource<any>;
  details: any
  userId:any;
  //userlist:any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //@ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService, private _dailog: MatDialog, private _empservice: EmployeeServiceService, private router: Router) {

  }
  ngAfterViewInit(): void {
    //this.empList.paginator = this.paginator;
  }
  ngOnInit(): void {

    //this.getEmployeeList();
    //var token = localStorage.getItem('token');
    this.userId= localStorage.getItem(`userId`);
    var token = this.authService.getToken(this.userId);
    //var tokenFromGlobal = Global.formValues.get("admintoken");
    //console.log('globaltoken retrieve' + tokenFromGlobal);
    //this.authService.getToken(userId);
    if (token) {

      this.authService.getDetailsLatest(token).subscribe(
        (detailsResponse: any) => {
          this.details = detailsResponse;
          console.log("fetched detals " + JSON.stringify(this.details));
          //this.userlist=res;
          this.empList = new MatTableDataSource(this.details);
          //  this.empList.sort = this['sort'];
          this.empList.paginator = this.paginator;
        },
        (error: any) => {
          console.error('Error fetching details', error);
        }
      );
    };
  }



  openAddEditEmployee() {

    const dialogRef = this._dailog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    })

  }

  getEmployeeList() {
    debugger
    /* this._empservice.getEmployeeList().subscribe({
       next: (res) => {
         console.log(res);
         //this.userlist=res;
        // this.empList = new MatTableDataSource(res);
         //this.empList.sort = this.sort;
        // this.empList.paginator = this.paginator;
       },
       error: console.log,
 
     });*/
    var token = localStorage.getItem('token');
    debugger

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.empList.filter = filterValue.trim().toLowerCase();
    if (this.empList.paginator) {
      this.empList.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._empservice.deleteEmployee(id).subscribe({
      next: (res) => {
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  openEditFormEmployee(data: any) {

    const dialogRef = this._dailog.open(EmpAddEditComponent, {
      data
    })

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    });
  }
}
