import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,  Validator, Validators} from "@angular/forms"
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!:FormGroup
  constructor(private fromBuilder : FormBuilder,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fromBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  login(){
    this.http.get<any>("https://n8f9z33wf1.execute-api.us-east-1.amazonaws.com/shoppingcartgetapi")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email &&a.password === this.loginForm.value.password
      });
      if(user){     
        this.loginForm.reset();
        this.router.navigate(['header'])
        alert("Login Success");
      }else{
        alert("user not found");
      }
    },err=>{
      alert("Something went wrong")
    })

  }

}
