import { Component, OnInit } from '@angular/core';
import { SharedService } from './service/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'shop_management_fe';
  isLoggedIn : boolean;
  constructor(private dataService : SharedService){
    this.isLoggedIn = dataService.isLoggedIn;
  }

  ngOnInit(): void {
    console.log('isLogged in in app component : ', this.dataService.isLoggedIn)
  }
  
}
