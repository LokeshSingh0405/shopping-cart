import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validator, Validators} from "@angular/forms"
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  public signupForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http: HttpClient , private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      mobile:['',Validators.compose([Validators.required,Validators.minLength(8)])]
    })
  }
  signUp(){
    this.http.post<any>("https://mgqs4qjfvk.execute-api.us-east-1.amazonaws.com/shoppingcartpostapi",JSON.stringify(this.signupForm.value))
    .subscribe(res=>{
      console.log(res)

      alert("Signup Successfull");
      this.signupForm.reset();
      this.router.navigate(['login']);
    },err=>{
      alert("Something went wrong")
    })

  }

}
