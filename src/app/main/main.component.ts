import { Component, OnInit } from '@angular/core';
import { ShopService } from '../service/shop.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  allRecords : any;
  recordForm: FormGroup;
  isRecordDeletd : boolean = false;
  summaryData : any;

  constructor(private shopService : ShopService, private fb: FormBuilder){
    this.recordForm = this.fb.group({
      date: ['', Validators.required],
      oysterSold: ['', Validators.required],
      tobaccoSold: ['', Validators.required],
      tobaccoSoldQuantity: ['', Validators.required],
      phoneCardsSold: ['', Validators.required],
      total: ['', Validators.required],
      shopSales: ['', Validators.required],
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
  }

  ngOnInit(): void {
    this.getAllRecords()
    console.log('summary data : ', this.summaryData == undefined? null : this.summaryData)
  }

  getAllRecords(){
    this.shopService.getAllRecords().subscribe( data => {
      this.allRecords = data;
    })
  }

  onSubmit(){
    console.log(this.recordForm.value);
    this.shopService.addRecord(this.recordForm.value).subscribe(data =>{
      if(data.status == 200){
        this.getAllRecords();
        this.recordForm.reset();
      }
    });
  }

  deleteRecord(record : any){
    if(confirm("Are you sure to delete "+ record.date + " record ?")) {
      this.shopService.deleteRecord(record.id).subscribe( data => {
        if(data.status == 200){
          this.getAllRecords();
        }
      });
    }

    if(this.isRecordDeletd == true){
      console.log(this.isRecordDeletd)
      this.getAllRecords();
    }
  }


  getSummary(){
    this.shopService.getSummaryBetweenDates(this.startDate?.value, this.endDate?.value).subscribe( data => {
      this.summaryData = data.data;
      console.log(this.summaryData)
    });
  }

  resetForm(){
    this.recordForm.reset();
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
