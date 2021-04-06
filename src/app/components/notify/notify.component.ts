import { Component, OnInit } from '@angular/core';
import { ToastController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss'],
})
export class NotifyComponent implements OnInit {
  notify: any = []
  notify2: any = []
  constructor(private navParams: NavParams) { 
    

  }

  ngOnInit() {}
  ionViewWillEnter() {
   
    this.notf()
  }
 

  notf(){
    
    this.notify = this.navParams.get('notify');
    this.notify2 = this.navParams.get('notify2');

    console.log(this.notify)
  }





}
