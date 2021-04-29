import { Component, OnInit, ViewChildren } from '@angular/core';
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
import { DatePipe } from '@angular/common'

import { environment } from '../../environments/environment';

const API_URL = environment.API_URL
@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
 
  page = 1;
  count = 0;
  tableSize = 5 ;
  status = "Clients"
  choice: any
  filteredservices: any = []
  filteredclients: any = []
  filteredpatients: any = []
  allservices: any = []
  allpatients: any = []
  allclients: any = []
  dailychoice: any
  monthlychoice: any
  weeklychoice: any
  date: any = []
  servicecount: any = []
  services: any = []
  currentuser: any = []
  notifydata2: any = []
  notifydata: any = []
 
  event: any = [];
  // chartData: ChartDataSets[] = [
  //   {data: [], label:'Services Made'}
  // ]
  // chartLabels: Label[]= []

  // chartOptions = {
    
  //   responsive: true,
  //   title: {
  //     display:true,
  //     text: 'Services Made'
  //   },
  //   pan: {
  //     enabled: true,
  //     mode: 'xy'

  //   },zoom: {
  //     enabled: true,
  //     mode: 'xy'

  //   }

  // };
  // chartType = 'bar';
  // showLegend = false;

  
  constructor(private datepipe: DatePipe,private platform:Platform,private popover: PopoverController,private modalCtrl: ModalController, private api: ApiService, private sched: ScheduleService, private router: Router, private authService: AuthenticationService) { 
    this.api.userinfo().then((data)=>{
      this.currentuser = data
      
    })
    
      // this.getservices()

      this.getclients()
      this.getpatients()
      this.getservices()

      
  }

  ngOnInit() {
  }

  onTableDataChange(event){
    this.page = event;
    this.getclients();
  } 

  get sortClients(){
    return this.filteredclients.sort((a, b) => {
      return <any>new Date(b.date_added) - <any>new Date(a.date_added);
    });
  }

  get sortPatients(){
    return this.filteredpatients.sort((a, b) => {
      return <any>new Date(b.patient_date_added) - <any>new Date(a.patient_date_added);
    });
  }

  get sortService(){
    return this.filteredservices.sort((a, b) => {
      return <any>new Date(b.patientname) - <any>new Date(a.patientname);
    });
  }
  
submit(){

let filtered = []
let filteredpatients = []
let filteredservices = []
if(this.choice == 'daily'){
for(let i =0 ; i < this.allclients.length; i++){
  let date_added = this.datepipe.transform(this.allclients[i].date_added, 'yyyy-MM-dd')
  if(this.dailychoice == date_added){
      filtered.push(this.allclients[i])


  }


}
this.filteredclients = filtered
console.log(this.filteredclients)


for(let i =0 ; i < this.allpatients.length; i++){
  let patient_date_added = this.datepipe.transform(this.allpatients[i].patient_date_added, 'yyyy-MM-dd')
  if(this.dailychoice == patient_date_added){
      filteredpatients.push(this.allpatients[i])


  }


}
this.filteredpatients = filteredpatients
console.log(this.filteredpatients)


/////




for(let i =0 ; i < this.allservices.length; i++){
  let service_date = this.datepipe.transform(this.allservices[i].service_date, 'yyyy-MM-dd')
  if(this.dailychoice == service_date){
      filteredservices.push(this.allservices[i])


  }


}
this.filteredservices = filteredservices
console.log(this.filteredservices)


}




else if(this.choice == 'weekly'){
  let weekarray = []
  let date = new Date(this.weeklychoice)
  let date2 = new Date(this.weeklychoice)

 let i = date.getDay()
 let i2 = date2.getDay()
 if(i==1){
    let i = date.getDay()
 for(i ;i<=7;i++){
    weekarray.push(this.datepipe.transform(date,'yyyy-MM-dd'))
    
  date = new Date(date.setDate(date.getDate()+1))

    
 }

 
}
else if(i == 0){
  for(i ;i<7;i++){
    weekarray.push(this.datepipe.transform(date,'yyyy-MM-dd'))
    
  date = new Date(date.setDate(date.getDate()-1))

    
 }

}
 else{
  for(i ;i<=7;i++){
    weekarray.push(this.datepipe.transform(date,'yyyy-MM-dd'))
    
  date = new Date(date.setDate(date.getDate()+1))

    
 }
 for(i2 ;i2>1;i2--){
  date2 = new Date(date2.setDate(date2.getDate()- 1))
  weekarray.push(this.datepipe.transform(date2,'yyyy-MM-dd'))
  


  
}



 }
  
 console.log(weekarray)
for(let i =0;i< weekarray.length; i++){
  for(let z =0; z <this.allclients.length; z++){
    let date_added= this.datepipe.transform(this.allclients[z].date_added, 'yyyy-MM-dd')
      if(date_added == weekarray[i]){
        filtered.push(this.allclients[z])

      }

  }





}

this.filteredclients = filtered
  console.log(this.filteredclients)


////////
for(let i =0;i< weekarray.length; i++){
  for(let z =0; z <this.allpatients.length; z++){
    let patient_date_added= this.datepipe.transform(this.allpatients[z].patient_date_added, 'yyyy-MM-dd')
      if(patient_date_added == weekarray[i]){
        filteredpatients.push(this.allpatients[z])

      }

  }





}

this.filteredpatients = filteredpatients
  console.log(this.filteredpatients)


  /////


  for(let i =0;i< weekarray.length; i++){
    for(let z =0; z <this.allservices.length; z++){
      let service_date= this.datepipe.transform(this.allservices[z].service_date, 'yyyy-MM-dd')
        if(service_date == weekarray[i]){
          filteredservices.push(this.allservices[z])
  
        }
  
    }
  
  
  
  
  
  }
  
  this.filteredservices = filteredservices
    console.log(this.filteredservices)
  
  }






else if(this.choice == 'monthly'){


  for(let i =0 ; i < this.allclients.length; i++){
    let date_added= this.datepipe.transform(this.allclients[i].date_added, 'yyyy-MM')
    if(this.monthlychoice == date_added){
      filtered.push(this.allclients[i])


  }



  }
  this.filteredclients = filtered
  console.log(this.filteredclients)

  ////
  for(let i =0 ; i < this.allpatients.length; i++){
    let patient_date_added= this.datepipe.transform(this.allpatients[i].patient_date_added, 'yyyy-MM')
    if(this.monthlychoice == patient_date_added){
      filteredpatients.push(this.allpatients[i])


  }



  }
  this.filteredpatients = filteredpatients
  console.log(this.filteredpatients)


  ///
  for(let i =0 ; i < this.allservices.length; i++){
    let service_date= this.datepipe.transform(this.allservices[i].service_date, 'yyyy-MM')
    if(this.monthlychoice == service_date){
      filteredservices.push(this.allservices[i])


  }



  }
  this.filteredservices = filteredservices
  console.log(this.filteredservices)
   
    }
}
getpatients(){
  this.api.get(API_URL+"user/getallpatients").subscribe((res)=>{

    this.allpatients = res
    console.log(this.allpatients)
})


}

getservices(){
  this.api.get(API_URL+"user/getallservice1").subscribe((res)=>{
    let allservice:any = []
    allservice = res
    for(let i =0;i<allservice.length;i++){
      if(allservice[i].done == 1){
        this.allservices.push(allservice[i])
        
      }


    }

    console.log(this.allservices)
    
})


}


getclients(){
  this.api.get(API_URL+"user/getclients").subscribe((res)=>{

      this.allclients = res
      
  })


}
  ionViewWillEnter() {
    
    this.notif()
   
  }

  // getservices(){
  //   this.api.get(API_URL+"user/getallservice").subscribe((res)=>{
  //           this.services = res
  //           console.log(this.services)
  //           for (let i = 0; i < this.services.length; i++) {
  //             if(this.date.indexOf(this.services[i].service_date) == -1){
  //                this.date.push(this.services[i].service_date);
         
                 
           
  //              }
  //              console
             
              
  //          }
  //          this.date.sort()  

  //          for (let i = 0; i < this.date.length; i++) {
  //           this.servicecount[i]=0;
      
  //           for(let x = 0; x <this.services.length; x++){
      
               
  //           if(this.date[i] == this.services[x].service_date){
               
  //              this.servicecount[i]+=1;
  //           }
      
  //           }
          
           
  //       }
  //       console.log(this.servicecount)


  //       for(let i =0 ; i <this.date.length ; i++){

  //         this.chartLabels.push(this.date[i]);
  //         this.chartData[0].data.push(this.servicecount[i]);

  //       }
  //       console.log('data', this.chartData)
         




  //   })



  // }


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
