import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { ToastController, NavParams, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { PhotomodalPage } from '../../components/photomodal/photomodal.page';
import { ViewphotopopPage } from '../../components/viewphotopop/viewphotopop.page';

import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

const API_URL = environment.API_URL
@Component({
  selector: 'app-testmodal',
  templateUrl: './testmodal.page.html',
  styleUrls: ['./testmodal.page.scss'],
})
export class TestmodalPage implements OnInit {
  test_type: any
  patienttest: any = []
  page2 = 1;
  count2 = 0;
  tableSize2 = 5 ;
  patient: any = []
  client: any = []
  selectedtest: File
  testinput: any;
  mobile: boolean
  constructor(private DomSanitizer: DomSanitizer,private popover: PopoverController,private alert: AlertController,public datepipe: DatePipe,private navParams: NavParams, private api: ApiService, private modalCtrl: ModalController) {

    this.patient = this.navParams.get('patient');
    this.client = this.navParams.get('client');
    this.getpatienttest()
    if (window.screen.width < 600) { // 768px portrait
      this.mobile = true;

     
    }

   
   }

  ngOnInit() {
  }

  onTableDataChange2(event){
    this.page2 = event;

  } 
  selectedFile(event){
    this.selectedtest = event.target.files[0];
   
  }

  get sorttest(){
    return this.patienttest.sort((a, b) => {
      return <any>new Date(b.test_date) - <any>new Date(a.test_date);
    });
  }



  getpatienttest(){
    this.api.get(API_URL+"user/getpatienttest?patient_id="+this.patient.patient_id).subscribe((res)=>{
  
      this.patienttest = res
      console.log(this.patienttest)
      for(let i =0; i <this.patienttest.length; i++){
        if(this.patienttest[i].test_photo != ''){
          this.patienttest[i].photolink = this.DomSanitizer.bypassSecurityTrustResourceUrl(API_URL+'uploads/test/'+this.patienttest[i].test_id+'/'+this.patienttest[i].test_photo)
  
        }
  
  
      }
  
  
    })
  
  
  }

  delete(data){
    const formData: FormData = new FormData();
    formData.append('test_id', data.test_id)
    
      this.api.add(API_URL+"user/deletetest", formData).subscribe((res)=>{

          if(res == "success"){

           

          }
          if(res== "error"){

            console.log("failed")
          }
            
      })



  }

  async markdelete(data){
    const alert = await this.alert.create({
   
      header: "",
      subHeader: "",
      message: "Are you sure?", 
      buttons: ['Cancel', {
    
        text: 'Delete',
        handler: ()=>{
          
          this.delete(data)
    
        }
    
      }],
    });
    alert.present();
    alert.onDidDismiss().then(()=>{
    
        this.getpatienttest()
    
    })

    
  }


  addpatienttest(){
    if(this.selectedtest && this.test_type){
    const formData: FormData = new FormData();
    formData.append('photo', this.selectedtest, this.selectedtest.name)
   
    formData.append('test_type', this.test_type)
    formData.append('patient', this.patient.patient_id)
 
   
    this.api.add(API_URL+"user/addtest", formData).subscribe((res)=>{ 




      this.test_type = ''
      this.testinput = ''
      this.getpatienttest()
     })


    }
  }
  async viewphoto(photo){

    const modal = await this.popover.create({
      component: ViewphotopopPage,
      cssClass: 'viewphoto1-popover',
      componentProps: {
        photo: photo
       
      }
    
  
    });
    
    await modal.present();



  }

  dismissModal(){
    this.modalCtrl.dismiss();
   
  }
}
