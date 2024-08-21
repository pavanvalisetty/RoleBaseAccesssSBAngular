import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';
interface education {
  value: string,
  viewValue: string;
}
@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})


export class EmpAddEditComponent implements OnInit {
  ngOnInit(): void {
   // debugger
    this.registerform.patchValue(this.data)

  }

  roles: education[] = [

    { value: 'user', viewValue: 'User' },
    { value: 'Employee', viewValue: 'Employee' },
    { value: 'Admin', viewValue: 'Admin' },
   // { value: 'Super Admin', viewValue: 'Super Admin' }

  ]
  buttonFinder=''
  registerform!: FormGroup;

  constructor(private _fb: FormBuilder, private _empService: EmployeeServiceService, private _dialogRef: MatDialogRef<EmpAddEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.registerform = this._fb.group({
    /*  firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      edu: ['', Validators.required],
      dob2: ['', Validators.required],
      gender: ['', Validators.required],
      company: ['', Validators.required],
      experience: ['', Validators.required],
      package1: ['', Validators.required] */
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      
      role: ['', Validators.required]
    })
  }

  resetForm() {
    //this.registerform.reset();
    this._dialogRef.close(true);

  }
  resetForm1() {
    return;

  }

  onFormSubmit() {
    debugger
    if(this.data==null){
      //this.registerform.patchValue(this.data)
    }
 
    if (this.data!=null && this.registerform.valid) {
      
        console.log('update operation');
        console.log(this.registerform.value);
        this._empService.updateEmployee(this.data.id, this.registerform.value).subscribe({

          next: (val: any) => {
            alert(' employee updated successfully')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        })

      
    } else {
      
        console.log(this.registerform.value);
        console.log('save operation');
        debugger;
        if (this.registerform.value.username != '' && this.registerform.value.name != '' && this.registerform.value.email != '' && this.registerform.value.phone != '') {
        //if (this.registerform.value.firstName != '' && this.registerform.value.lastName != '' && this.registerform.value.dob != '' && this.registerform.value.email != '') {
        /*  this._empService.addEmployee(this.registerform.value).subscribe({
            next: (val: any) => {
              this._dialogRef.close(true);
              this._empService.getEmployeeList();
              this.registerform.reset();
            },
            error: (err: any) => {
              console.log(err);
            } 
              */
            this._empService.addEmployeeLatest(this.registerform.value).subscribe({
              next: (val: any) => {
                this._dialogRef.close(true);
                this._empService.getEmployeeList();
                this.registerform.reset();
              },
              error: (err: any) => {
                console.log(err);
              } 

          })
        }
      

    }
  }




}
