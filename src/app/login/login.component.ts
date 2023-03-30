import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShopService } from '../service/shop.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private router: Router,
              private shopService : ShopService,
              private fb: FormBuilder,
              public dataService: SharedService,){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  login(){
    if(this.loginForm.controls['username'].value == 'user' && this.loginForm.controls['password'].value == 'password'){
      this.router.navigate(['/main']).then(r => {
        this.dataService.isLoggedIn = true;
        console.log('isLoggedIn login page : ',this.dataService.isLoggedIn)
      });
    }
  }

}
