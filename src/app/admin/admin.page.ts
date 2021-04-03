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
declare var myFunction;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
clients: any = []

eventSource = [];
  viewTitle: string;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  selectedDate: Date;
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(private alertCtrl: AlertController,@Inject(LOCALE_ID) private locale: string,private api: ApiService,private router:Router, private platform: Platform,private storage: Storage,private authService: AuthenticationService,private modalCtrl: ModalController) { 

    this.getclients()
    
  }

  ngOnInit() {
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
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK'],
    });
    alert.present();
  }
  removeEvents() {
    this.eventSource = [];
  }

  onTimeSelected(ev) {    
    console.log(ev)
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

  gotopet(client){
    this.router.navigate(['/petdashboard',{client_id:client}])
    
   


  }

  getclients(){
      this.api.get("https://localhost/furcare/user/getclients").subscribe(res => {
        console.log(res)
       
          this.clients = res;
          console.log(res)
        
        
      
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
}
