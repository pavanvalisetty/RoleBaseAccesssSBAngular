import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css']
})
export class UserlistingComponent implements OnInit {

  displayedColumns: string [] = ['id','firstName','lastName','email','company','dob','experience','package1','action']
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private _dailog:MatDialog,private _empservice:EmployeeServiceService,private router:Router){

  }
  ngOnInit(): void {
    //this.getEmployeeList();

  }

  opennAddEditEmployee(){
   // const dialogRef = this._dailog.open(EmpAddEditComponent);
    
  }
  
}
