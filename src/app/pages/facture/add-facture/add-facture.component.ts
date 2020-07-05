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


@Component({
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.scss']
})
export class AddFactureComponent implements OnInit {
  ClientList: Client[];
  isValid = true;
  DateCreation;
  DateEcheance;
  client: any={};
  annee = 0;

  constructor(
    public service: FactureService,
    public articleservice: ArticleService,
    private dialog: MatDialog, public fb: FormBuilder,
    public clientService: ClientService,
    private toastr :ToastrService,
    private router :Router,
    private datePipe : DatePipe
  ) { }
  get f() { return this.service.formData.controls}

  ngOnInit(): void {
    if(this.service.choixmenu ==='A') {
      this.InfoForm();
      this.service.list = [];
      this.DateCreation = this.transformDate( new Date(Date.now()));
      this.annee = (this.DateCreation).toString().substring(0,4);
      this.f['annee'].setValue(this.annee);
    }
    else {
      this.articleservice.getData(this.service.formData.value.id).subscribe(res => {
        this.service.formData = this.fb.group(Object.assign({},res));
      });
      this.articleservice.getAll(this.service.formData.value.id).subscribe(
        response => {this.service.list= response}
      );
      this.f['dateCreation'].setValue(this.service.formData.value.deteCreation);
    }
  }

  InfoForm() {
    this.service.formData = this.fb.group({
      id:null,
      Statut:0,
      NomClient:0,
      DateGeneration: '',
      ClientId:0 ,
      DevisId:0,
      Produitid:0,
      Article:0,
      totTTC:0,
      totHT:0,
    });
  }

  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ResetForm() {
    this.service.formData.reset();
  }

  onDelete(item : Article,Id:number,i:number){
    if(Id != null)
    this.service.formData.value.id+=Id ;
   this.service.list.splice(i,1);
   this.calcul();
   }

   calcul() {
    this.f.totHT.setValue(this.service.list.reduce((prev, curr) => {
      return prev + curr.totHT;
    }, 0));
    this.f.totTVA.setValue(this.service.list.reduce((prev, curr) => {
      return prev + curr.TVA;
    }, 0));
    this.f.totTTC.setValue(this.service.list.reduce((prev, curr) => {
      return prev + curr.totTTC;
    }, 0));

   }

   validateForm(){
    this.isValid = true ;

    if(this.service.formData.value.id_client===0)
    this.isValid =false;

    else if (this.service.list.length===0)
    this.isValid =false;
    return this.isValid;
  }

  OnSelectClient(ctrl)
{
   if(ctrl.selectedIndex === 0){
    this.f.nomClient.setValue('');
    this.f.clientId.setValue('');
   }
   else{
      this.f.nomClient.setValue(this.ClientList[ctrl.selectedIndex - 1].Nom);
      this.f.clientId.setValue(this.ClientList[ctrl.selectedIndex - 1].Id);
   }
 }

 onSubmit(){
  this.f['article'].setValue(this.service.list);
    this.service.saveOrUpdate(this.service.formData.value).
    subscribe( data => {
      this.toastr.success( 'Validation Faite avec Success');
      this.router.navigate(['/facture']);
    });
 }

}
