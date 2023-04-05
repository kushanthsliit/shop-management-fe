import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  // @Output() loggedIn = new EventEmitter();

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
    if(sessionStorage.getItem('isLoggedIn') == 'true'){
      this.router.navigate(['/dashboard']);
    }
  }

  login(){
    if(this.loginForm.controls['username'].value == 'user' && this.loginForm.controls['password'].value == 'password'){
      this.router.navigate(['/dashboard']).then(r => {
        this.dataService.isLoggedIn = true;
        // this.loggedIn.emit();
        sessionStorage.setItem('isLoggedIn', 'true');
        // console.log('isLoggedIn login page : ',this.dataService.isLoggedIn)
      });
    }
    else {
      sessionStorage.setItem('isLoggedIn', 'false');
    }
  }

}
