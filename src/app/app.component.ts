import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { SharedService } from './service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {

  title = 'shop_management_fe';
  isLoggedIn : boolean;
  dashboardlink : string = '';
  constructor(private dataService : SharedService, private router: Router,){
    this.isLoggedIn = dataService.isLoggedIn;
  }

  ngDoCheck(): void {
    const loginFlag = sessionStorage.getItem('isLoggedIn');
    if(loginFlag == 'true'){
      this.isLoggedIn = true
    }
    else {
      this.isLoggedIn = false;
    }
    // console.log('nav isLoggedIn : ',this.isLoggedIn)
  }

  ngOnInit(): void {
   if(this.isLoggedIn == false){
    this.router.navigate(['']);
   }

   console.log('app component isLoggedIn : ',sessionStorage.getItem('isLoggedIn'))
  }

  logout(){
    this.router.navigate(['']).then(r => {
      this.dataService.isLoggedIn = false;
      // this.resetStroage();
      sessionStorage.setItem('isLoggedIn', 'false');
      console.log('isLoggedIn : ',sessionStorage.getItem('isLoggedIn'));
    });
  }

  public resetStroage(){
    sessionStorage.removeItem('isLoggedIn');
  }
  
}
