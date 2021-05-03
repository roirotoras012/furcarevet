import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { ToastController, NavParams, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { PhotomodalPage } from '../../components/photomodal/photomodal.page';
import { ViewphotopopPage } from '../../components/viewphotopop/viewphotopop.page';

import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
  selector: 'app-testmodal',
  templateUrl: './testmodal.page.html',
  styleUrls: ['./testmodal.page.scss'],
})
export class TestmodalPage implements OnInit {

  patient: any = []
  client: any = []
  selectedtest: File
  constructor(private DomSanitizer: DomSanitizer,private popover: PopoverController,private alert: AlertController,public datepipe: DatePipe,private navParams: NavParams, private api: ApiService, private modalCtrl: ModalController) {

    this.patient = this.navParams.get('patient');
    this.client = this.navParams.get('client');
    console.log(this.patient, this.client)
   }

  ngOnInit() {
  }
  selectedFile(event){
    this.selectedtest = event.target.files[0];
   
  }
}
