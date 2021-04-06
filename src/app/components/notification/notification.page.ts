import { Component, OnInit } from '@angular/core';
import { ToastController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notify: any = []
  notify2: any = []
  notif: any = []
  constructor(private navParams: NavParams) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
   
    this.notf()
  }
  notf(){
    
    this.notify = this.navParams.get('notify');
    this.notify2 = this.navParams.get('notify2');

    for(let i =0 ; i < this.notify.length; i++){
      let qwe = {
        
        schedule_id: this.notify[i].schedule_id,
        startTime: this.notify[i].startTime,
        description: this.notify[i].description,
        name: this.notify[i].name,
        title: this.notify[i].title,
        days: this.notify2[i].daysleft


      }
      this.notif.push(qwe)



    }

    this.notif.sort((a,b)=> a.days-b.days);
    console.log(this.notif)

    console.log(this.notify)


    // this.notifydata2.sort((a,b)=> a.daysleft-b.daysleft);



  }
}
