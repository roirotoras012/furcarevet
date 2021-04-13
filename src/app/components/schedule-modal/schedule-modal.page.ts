import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core'
import { AlertController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar/';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ToastController, NavParams } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-schedule-modal',
  templateUrl: './schedule-modal.page.html',
  styleUrls: ['./schedule-modal.page.scss'],
})
export class ScheduleModalPage implements OnInit {
  eventSource = [];
  patient_id: any;
  client_id : any;
  user_id: any;
  
  viewTitle: string;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  minDate = new Date().toISOString();
  
  selectedDate: Date;
  modalReady = false;
  event = {
    title: '',
    desc: '',
    startTime: null,
    endTime: null,
    allDay: true
  };
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  constructor(public toastController: ToastController, private navParams: NavParams,private api: ApiService,private modalCtrl: ModalController,private alertCtrl: AlertController,@Inject(LOCALE_ID) private locale: string) {
   
    this.minDate = this.minDate.slice(0,16)
  
    
    
   }
  ngAfterViewInit() {
   
    setTimeout(() => {
      this.modalReady = true;      
    }, 0);
  }
  ngOnInit() {
    
  }
  dismissModal(){
    this.modalCtrl.dismiss();
   
  }

  next() {
    this.myCal.slideNext();
  }



  save() {    
     

   
    this.patient_id = this.navParams.get('patient_id');
    this.client_id = this.navParams.get('client_id');
    this.api.userinfo().then((user)=>{
      this.user_id = user.user_id
      const formData: FormData = new FormData();
    formData.append('title', this.event.title)
    formData.append('description', this.event.desc)
    formData.append('startTime', this.event.startTime)
    formData.append('endTime', this.event.endTime)
    formData.append('allDay', new Boolean(this.event.allDay).toString())
    formData.append('user', user.user_id)
    formData.append('patient', this.patient_id)
    formData.append('client', this.client_id)
   console.log(this.event.allDay)
    this.api.add("https://localhost/furcare/user/addsched", formData).subscribe((data)=>{
    
      if(data == "success"){
     

      }

    }, err => {
      
      console.log(err);
      });
      
    
    
    
    
    
    this.eventSource.push(this.event);
     console.log(this.eventSource)
      this.event = {
        title: '',
        desc: '',
        startTime: null,  
        endTime: null,
        allDay: true
      };
      this.myCal.loadEvents();
    

    })
   
   
    this.modalCtrl.dismiss({event: this.event})
    
  
  }
  close() {
    this.modalCtrl.dismiss();
  }
  back() {
    this.myCal.slidePrev();
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  async onEventSelected(event) {
    
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
 
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK'],
    });
    alert.present();
  }
  removeEvents() {
    this.eventSource = [];
  }

  onTimeSelected(ev) { 
    this.event.startTime = new Date(ev.selectedTime); 
    this.event.endTime = new Date(ev.selectedTime); 

  
  }
  


}
