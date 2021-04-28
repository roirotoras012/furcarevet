import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NotificationPage } from '../components/notification/notification.page';
import { ScheduleService } from '../services/schedule.service'
import { ModalController, PopoverController } from '@ionic/angular';
import { PopoverComponent } from './../components/popover/popover.component';
import { Platform } from '@ionic/angular';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { environment } from '../../environments/environment';

const API_URL = environment.API_URL
@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  date: any = []
  servicecount: any = []
  services: any = []
  currentuser: any = []
  notifydata2: any = []
  notifydata: any = []
 
  event: any = [];
  chartData: ChartDataSets[] = [
    {data: [], label:'Services Made'}
  ]
  chartLabels: Label[]= []

  chartOptions = {
    
    responsive: true,
    title: {
      display:true,
      text: 'Services Made'
    },
    pan: {
      enabled: true,
      mode: 'xy'

    },zoom: {
      enabled: true,
      mode: 'xy'

    }

  };
  chartType = 'bar';
  showLegend = false;
  constructor(private platform:Platform,private popover: PopoverController,private modalCtrl: ModalController, private api: ApiService, private sched: ScheduleService, private router: Router, private authService: AuthenticationService) { 
    this.api.userinfo().then((data)=>{
      this.currentuser = data

    })
      this.getservices()


      let date = new Date()
    console.log(date.getUTCDay())

  }

  ngOnInit() {
  }


  ionViewWillEnter() {
    
    this.notif()
   
  }

  getservices(){
    this.api.get(API_URL+"user/getallservice").subscribe((res)=>{
            this.services = res
            console.log(this.services)
            for (let i = 0; i < this.services.length; i++) {
              if(this.date.indexOf(this.services[i].service_date) == -1){
                 this.date.push(this.services[i].service_date);
         
                 
           
               }
               console
             
              
           }
           this.date.sort()  

           for (let i = 0; i < this.date.length; i++) {
            this.servicecount[i]=0;
      
            for(let x = 0; x <this.services.length; x++){
      
               
            if(this.date[i] == this.services[x].service_date){
               
               this.servicecount[i]+=1;
            }
      
            }
          
           
        }
        console.log(this.servicecount)


        for(let i =0 ; i <this.date.length ; i++){

          this.chartLabels.push(this.date[i]);
          this.chartData[0].data.push(this.servicecount[i]);

        }
        console.log('data', this.chartData)
         




    })



  }


  async logout() {
    
    this.authService.logout();
    this.platform.ready().then(()=>{
          
      this.authService.authenticationState.subscribe((state)=>{
        console.log(state);
        if(state){
          
         
        }else{
            this.router.navigate(['login'])
        }

      })
      this.authService.notloggedin.subscribe((state)=>{
        console.log(state);
        

      })

   })
  
    
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

        if(daysleft <= 2   && daysleft >= 0){

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

// 

async _popOver(ev:any){
  const popover = await this.popover.create({
    component: PopoverComponent,
    event: ev
  })
  return await popover.present()
}


// sortBy(key){
//   this.sortKey = key;
//   this.sortDirection++;
//   this.sort();

// }
// sort(){
//   if(this.sortDirection == 1){
//       this.datauser = this.datauser.sort((a, b  )=>{
//         const valA = a[this.sortKey];
//         const valB = b[this.sortKey];
//         return valA.localeCompare(valB);

//       });
//   }else if(this.sortDirection==2){
//     this.datauser = this.datauser.sort((a, b  )=>{
//       const valA = a[this.sortKey];
//       const valB = b[this.sortKey];
//       return valB.localeCompare(valA);

//     });

//   }else{
//     this.sortDirection = 0 ;
//     this.sortKey = null;
//   }

// }

}
