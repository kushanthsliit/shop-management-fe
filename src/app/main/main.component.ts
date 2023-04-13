import { Component, OnInit } from '@angular/core';
import { ShopService } from '../service/shop.service';
import { SharedService } from '../service/shared.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  allRecords : any;
  recordForm: FormGroup;
  summaryData : any;
  formShopSales : number = 0;
  constructor(private shopService : ShopService,
              private fb: FormBuilder, 
              private dataService : SharedService,
              private router : Router){
    this.recordForm = this.fb.group({
      date: ['', Validators.required],
      oysterSold: ['', Validators.required],
      tobaccoSold: ['', Validators.required],
      tobaccoSoldQuantity: ['', Validators.required],
      phoneCardsSold: ['', Validators.required],
      total: ['', Validators.required],
      shopSales: [''],
      shop: ['', Validators.required],
      phoneCardsPurchased: ['', Validators.required],
      tobaccoPurchased: ['', Validators.required],
      tobaccoPurchasedQuantity: ['', Validators.required],
      wages: ['', Validators.required],
      expenses: ['', Validators.required],
      commision: ['', Validators.required],
      startDate: [],
      endDate: []
    });

    if(this.dataService.isLoggedIn == true){
      router.canceledNavigationResolution = 'computed';
    }

  }

  ngOnInit(): void {
    // this.recordForm.get('shopSales')?.disable(); 
    if(sessionStorage.getItem('isLoggedIn') == 'false' || sessionStorage.getItem('isLoggedIn') == null){
      console.log('isLoggedIn : ',sessionStorage.getItem('isLoggedIn'));
      this.router.navigate(['/login']);
    }
    else {
      this.getAllRecords()
    }
  }

  getAllRecords(){
    this.shopService.getAllRecords().subscribe( data => {
      this.allRecords = data;
    })
  }

  onSubmit(){
    // console.log(this.recordForm.value);
    this.formShopSales = this.total?.value - this.oysterSold?.value - this.tobaccoSold?.value - this.phoneCardsSold?.value;
    this.shopSales?.setValue(this.formShopSales);
    this.shopService.addRecord(this.recordForm.value).subscribe(data =>{
      if(data.data != null){
        this.getAllRecords();
        this.recordForm.reset();
        Swal.fire('Data Added Successfully Date of ',data.data.date, 'success');
        // console.log(this.recordForm.value)
      }
      else{
        Swal.fire('Already a Record Found The same Date ',this.recordForm.controls['date'].value, 'error');
      }
    });
  }

  deleteRecord(record : any){

    Swal.fire({
      title: 'Are you sure want to Delete '+ record.date + ' ?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.shopService.deleteRecord(record.id).subscribe( data => {
          if(data.status == 200){
            this.getAllRecords();
          }
        });
        Swal.fire('Removed!', 'Record removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire('Cancelled', 'Record still in our database', 'error');
      }
    });
  }


  getSummary(){

    if(this.startDate?.value > this.endDate?.value){
      Swal.fire('Cancelled', 'Start Date Should Be Less Than End Date', 'error');
    }

    if((this.startDate != null || this.startDate != undefined) && (this.endDate != null || this.endDate != undefined)){
      this.shopService.getSummaryBetweenDates(this.startDate?.value, this.endDate?.value).subscribe( data => {
        this.summaryData = data.data;
      });
      this.getReCordsByDateRange();
    }
    else{
      this.summaryData = null;
    }
   
  }

  getReCordsByDateRange(){
    this.shopService.getRecordsByDateRange(this.startDate?.value, this.endDate?.value).subscribe( data => {
      this.allRecords = data;
      console.log('date range :',this.allRecords)
    });
  }

  resetForm(){
    this.recordForm.reset();
    this.summaryData = null;
    this.getSummary();
    this.getAllRecords();
  }

  get date() {
     return this.recordForm.get('date'); 
  }
  get oysterSold() {
    return this.recordForm.get('oysterSold'); 
  }
  get tobaccoSold() {
    return this.recordForm.get('tobaccoSold'); 
  }
  get tobaccoSoldQuantity() {
    return this.recordForm.get('tobaccoSoldQuantity'); 
  }
  get phoneCardsSold() {
    return this.recordForm.get('phoneCardsSold'); 
  }
  get total() {
    return this.recordForm.get('total'); 
  }
  get shopSales() {
    return this.recordForm.get('shopSales'); 
  }
  get shop() {
    return this.recordForm.get('shop'); 
  }
  get phoneCardsPurchased() {
    return this.recordForm.get('phoneCardsPurchased'); 
  }
  get tobaccoPurchased() {
    return this.recordForm.get('tobaccoPurchased'); 
  }
  get tobaccoPurchasedQuantity() {
    return this.recordForm.get('tobaccoPurchasedQuantity'); 
  }
  get wages() {
    return this.recordForm.get('wages'); 
  }
  get expenses() {
    return this.recordForm.get('expenses'); 
  }
  get commision() {
    return this.recordForm.get('commision'); 
  }
  get startDate() {
    return this.recordForm.get('startDate'); 
  }
  get endDate() {
    return this.recordForm.get('endDate'); 
  }
  
}
