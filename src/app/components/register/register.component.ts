import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private toaster: ToastrService,private authService:AuthService,private router:Router) {

  }
  roles: string[] = ["",""];
  registerform = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male', Validators.required),
    role: this.builder.control('', Validators.required),
    isActive: this.builder.control(false),
  })

  proceedregistration() {

    if (this.registerform.valid) {
      this.authService.makeRegister(this.registerform.value).subscribe(res=>{
        this.toaster.success("Please contact Admin for enable access","Registered successfully");
        this.router.navigateByUrl("/home");
      });

    } else {
      this.toaster.warning(' Please enter valid data')
    }
  }
  onclickRegister(){

  }

}
