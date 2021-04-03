import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from './../services/authentication.service';
import { Storage } from '@ionic/Storage'
import { ModalController } from '@ionic/angular';
import { AddclientmodalComponent } from './addclientmodal/addclientmodal.component';
import { ApiService } from '../services/api.service';
declare var myFunction;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
clients: any = []
  constructor(private api: ApiService,private router:Router, private platform: Platform,private storage: Storage,private authService: AuthenticationService,private modalCtrl: ModalController) { 

    this.getclients()
    
  }

  ngOnInit() {
  }
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
