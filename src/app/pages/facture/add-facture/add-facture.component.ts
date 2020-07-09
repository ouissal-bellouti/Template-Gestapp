import { Component, OnInit } from '@angular/core';
import { Client } from '../../client';
import { FactureService } from 'src/app/services/facture.service';
import { ClientService } from 'src/app/services/client.service';
import { ArticleService } from 'src/app/services/article.service';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Article } from '../../article';
import { Devis } from '../../devis';


@Component({
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.scss']
})

export class AddFactureComponent implements OnInit {
 ClientList: Client[];
  DevisList:Array<Devis>;
  isValid:true;
  DateGeneration:Date;
  DateEchence:Date;


  constructor(
    public service: FactureService,
    private dialog: MatDialog,
    public fb: FormBuilder,
    public clientService: ClientService,
    public toastr: ToastrService,
    private router: Router,
    private datepipe: DatePipe) {}
    f() { return this.service.formData.controls }


    InfoForm() {
      this.service.formData = this.fb.group({
        Id:'',
        DateGeneration:0,
        DateEcheance:0,
        Statut:'',
        ClientId:'',

      })
    }
  ngOnInit(): void {}


  onSubmit(){
    this.f[''].setValue(this.service.list);
      this.service.saveOrUpdate(this.service.formData.value).
      subscribe( data => {
        this.toastr.success( 'Validation Faite avec Success');
        this.router.navigate(['/devis']);
      });
   }




  OnselectClient(ctrl) {
    if(ctrl.selectedIndex === 0){
      this.f['Nom'].setValue('');
      this.f['Id'].setValue('');
    }
    else {
      this.f['Nom'].setValue(this.ClientList[ctrl.selectedIndex - 1].Nom);
      this.f['Id'].setValue(this.ClientList[ctrl.selectedIndex - 1].Id);
    }
  }
}
