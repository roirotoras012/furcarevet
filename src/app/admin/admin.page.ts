import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core'
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar/';
import { AuthenticationService } from './../services/authentication.service';
import { Storage } from '@ionic/Storage'
import { ModalController } from '@ionic/angular';
import { AddclientmodalComponent } from './addclientmodal/addclientmodal.component';
import { ApiService } from '../services/api.service';
import { formatDate } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { ServicepopComponent } from '../components/servicepop/servicepop.component';
import { PopoverController } from '@ionic/angular';
import { observable, Observable, Subscription, interval } from 'rxjs';
import { webSocket } from 'rxjs/webSocket'
import { switchMap, map} from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { ScheduleService } from '../services/schedule.service'
import { NotificationPage } from '../components/notification/notification.page';

import { ScheduleModalPage } from '../components/schedule-modal/schedule-modal.page';

declare var myFunction;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  notifydata2: any = []
  notifydata: any = []
clients: any = []
currentuser: any = []

asd = new Date
event: any = [];
eventSource = [];
subscription: Subscription;
event1 = {
  schedule_id : '',
  title: '',
  desc: '',
  startTime: null,
  endTime: null,
  allDay: true
};
  viewTitle: string;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };


  
  selectedDate: Date;
  
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(private sched: ScheduleService,private loading: LoadingController,private popover: PopoverController,private alertCtrl: AlertController,@Inject(LOCALE_ID) private locale: string,private api: ApiService,private router:Router, private platform: Platform,private storage: Storage,private authService: AuthenticationService,private modalCtrl: ModalController) { 
    

    let asd: any = new Date
   
    
  
    
  }
  ionViewWillEnter() {
    this.getclients()
    this.getschedule()
    this.notif()
    this.api.userinfo().then((data)=>{

      this.currentuser = data;
      



    })
  }
  ngOnInit() {
   
//     const source = interval(10000);

// this.subscription = source.subscribe(val => this.getclients());
   
  }
  next() {
    this.myCal.slideNext();
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
      message: start.slice(0,12), 
      // message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK', {

        text: 'Delete',
        handler: ()=>{
          
          this.deleteconfirm(event);

        }

      }],
    });
    alert.present();
  }
  

  
  removeEvents() {
    this.eventSource = [];
  }


  onTimeSelected(ev) {    
    
  }

  async deleteconfirm(event){
    let ev = event
    const alert = await this.alertCtrl.create({
      header: 'Are you sure you want to delete this shedule?',
      message: ev.title+'<br>'+ev.description,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deletesched(ev);
          }
        }
      ]
    });

    await alert.present();
     


  }
  
  async deletesched(ev){
    this.api.get("https://localhost/furcare/user/deletesched?schedule_id="+ev.schedule_id).subscribe((res)=>{

      this.getschedule()
      this.notif()
    
    })

  }



  // <----->
  async logout() {
    
    this.authService.logout();
    this.platform.ready().then(()=>{
          
      this.authService.authenticationState.subscribe((state)=>{
        console.log(state);
        if(state){
          
          this.router.navigate(['','admin'])
        }else{
            this.router.navigate(['login'])
        }

      })
      this.authService.notloggedin.subscribe((state)=>{
        console.log(state);
        

      })

   })
  
    
  }

  
getschedule(){
  this.eventSource = [];

  this.api.get("https://localhost/furcare/user/getschedule").subscribe((sched)=>{
   
  console.log(sched)
   
  for(let data of Object.values(sched)){
    this.event1.schedule_id = data.schedule_id
    this.event1.title = data.title
    this.event1.desc = data.description
    this.event1.startTime = new Date(data.startTime)
    this.event1.endTime = new Date(data.endTime)
    if(data.allDay == 1){
      this.event1.allDay = true

    }else{
      this.event1.allDay = false
    }
    
    this.eventSource.push(this.event1)
    
    this.event1 = {
      schedule_id:'',
      title: '',
      desc: '',
      startTime: null,
      endTime: null,
      allDay: true
    };
    this.myCal.loadEvents();

    
  }
    //--- compare date interval in days ---//
  // let asd: any = new Date
  // let zxc= Math.floor((Date.UTC(this.eventSource[10].startTime.getFullYear(), this.eventSource[10].startTime.getMonth(), this.eventSource[10].startTime.getDate())-Date.UTC(asd.getFullYear(), asd.getMonth(), asd.getDate())) /(1000 * 60 * 60 * 24));
  // console.log(zxc)
   
  
    

  })



}



  async gotopet(client){
   
    this.router.navigate(['/petdashboard',{client_id:client}])
    
   


  }


  getclients(){

    
      this.api.get("https://localhost/furcare/user/getclients").subscribe(res => {
   
       
          this.clients = res;
      
        
         
        
       
        
       
      
    }, err => {
      
    console.log(err);
    });

  }
  
  

  async openadd(){
    const modal = await this.modalCtrl.create({
      component: AddclientmodalComponent,
     
    

    });
    
    await modal.present();
    await modal.onWillDismiss();
    this.getclients();
    
  }

  
  notif(){
    this.event = []
    this.notifydata = []
    this.notifydata2 = []
    let asd = new Date
    // let zxc= Math.floor((Date.UTC(this.eventSource[10].startTime.getFullYear(), this.eventSource[10].startTime.getMonth(), this.eventSource[10].startTime.getDate())-Date.UTC(asd.getFullYear(), asd.getMonth(), asd.getDate())) /(1000 * 60 * 60 * 24));
    // console.log(zxc)
    this.sched.notification().subscribe((res)=>{

      this.event = res
     
      for(let i = 0 ; i < this.event.length; i++){
        let startTime = new Date(this.event[i].startTime)
       
       let daysleft = (Math.floor((Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate())-Date.UTC(asd.getFullYear(), asd.getMonth(), asd.getDate())) /(1000 * 60 * 60 * 24)))
        // if((Math.floor((Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate())-Date.UTC(asd.getFullYear(), asd.getMonth(), asd.getDate())) /(1000 * 60 * 60 * 24)))>=3){

        //   this.notifydata.push(this.event[i])

        // }  

        if(daysleft <= 3 && daysleft >= 0){

          this.notifydata.push(this.event[i])
        this.notifydata2.push({
            'schedule_id': this.event[i].schedule_id,
            'daysleft': daysleft

        })
         
        }
        
      
      }
    
      
       


      
    
    })

  }
  async notifypop(ev:any){

    const popover = await this.popover.create({
      event: ev,
      component: NotificationPage,
      cssClass: 'notify-popover',
      componentProps: {
        notify: this.notifydata,
        notify2: this.notifydata2


      }
      
      
    })
    return await popover.present()


  }


  async schedule(){

    const modal = await this.modalCtrl.create({
      component: ScheduleModalPage,
      cssClass: 'cal-modal',
      componentProps: {
       
      
  
  
  
      }
      
  
    });
    
    await modal.present();
    await modal.onDidDismiss().then(()=>{
      this.getschedule()
      this.notif();
      

    });
  
    
  }
}

