import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lineChartData = {
      labels: ["sun", "mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          data: [89, 34, 43, 54, 28, 74, 93],
          label: 'Monthly Profit Of the Year',
          borderColor: ' rgb(23, 60, 93)',
          tension : 0.5
        }
      ]
  }

  barChartData = {
    labels: ["sun", "mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [89, 34, 43, 54, 28, 74, 93],
        label: 'Monthly Sales Of the Year',
        backgroundColor: '#f88406',
      }
    ]
  }

  pieChartData = {
    labels: ["sun", "mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [89, 34, 43, 54, 28, 74, 93],
        label: 'Purchase Of the Month',
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 15
      }
    ]
  }

  pieChartOptions = {
    responsive : false
  }

  doughnutChartData = {
    labels: ["sun", "mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [89, 34, 43, 54, 28, 74, 93],
        label: 'Expenses of the Month',
        backgroundColor: [
          'rgba(255, 0, 25, 0.7)',
          'rgba(0, 255, 25, 0.7)'
        ],
        cutout : "60%",
        hoverOffset: 15,
      }
    ]
  }

  doughnutChartOptions = {
    responsive : false
  }

  constructor(private router : Router){}

  ngOnInit(): void {
    if(sessionStorage.getItem('isLoggedIn') == 'false'){
      console.log('isLoggedIn : ',sessionStorage.getItem('isLoggedIn'));
      this.router.navigate(['/login']);
    }
  }

  gotoDEPage(){
    this.router.navigate(['/main'])
  }

}
