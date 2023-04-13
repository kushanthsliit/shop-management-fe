import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../service/shop.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  profits : any;
  lineChartData = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Monthly Profit Percentage',
        borderColor: ' rgb(23, 60, 93)',
        tension : 0.5
      }
    ]
  }

  barChartData = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Sales Percentage Of The Month',
        backgroundColor: '#f88406',
      }
    ]
  }
  
  constructor(private router : Router, private shopService : ShopService){}

  ngOnInit(): void {
    if(sessionStorage.getItem('isLoggedIn') == 'false' || sessionStorage.getItem('isLoggedIn') == null){
      console.log('isLoggedIn : ',sessionStorage.getItem('isLoggedIn'));
      this.router.navigate(['/login']);
    }
    this.getChartData();
    console.log('line chart values : ',this.barChartData)
  }

  getChartData(){
    this.shopService.getChartData().subscribe( data => {
      this.profits = data.summaryResponse.profits;
      this.lineChartData.datasets[0].data =  data.lineChartData.chartValues;
      this.lineChartData.labels = data.lineChartData.chartLabels;
      this.barChartData.labels = data.barChartData.chartLabels;
      this.barChartData.datasets[0].data = data.barChartData.chartValues;
    })
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

}
