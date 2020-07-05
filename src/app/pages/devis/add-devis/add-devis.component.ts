import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from '../../client';
import { Devis } from '../../devis';
import { DevisService } from 'src/app/services/devis.service';
import { LigneDevis } from '../../ligneDevis';
import { DatePipe } from '@angular/common';
import { LigneDevisService } from 'src/app/services/ligne-devis.service';
import { AddLignedevisComponent } from '../add-lignedevis/add-lignedevis.component';
import { Produit } from '../../produit';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute  } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import '@angular/localize/init';

@Component({
  selector: 'app-add-devis',
  templateUrl: './add-devis.component.html',

})
export class AddDevisComponent implements OnInit {
  ClientList: Client[];

  isValid = true;
  dateCreation;
  dateLivraison;
  client   : any= {};
  annee  = 0;

  constructor(
    public service:DevisService,
    public ldservice:LigneDevisService,
    private dialog:MatDialog,public fb: FormBuilder,
    public clientService :ClientService,
    private toastr :ToastrService,
    private router :Router,
    private currentRoute: ActivatedRoute,
    private datePipe : DatePipe) { }
    get f() { return this.service.formData.controls }


    ngOnInit(): void {
      if(this.service.choixmenu ==='A') {
        this.InfoForm();
        this.service.list = [];
        this.dateCreation = this.transformDate( new Date(Date.now()));
        this.annee = (this.dateCreation).toString().substring(0,4);
        this.f['annee'].setValue(this.annee);
      }
      else {
        this.ldservice.getData(this.service.formData.value.id).subscribe(res => {
          this.service.formData = this.fb.group(Object.assign({},res));
        });
        this.ldservice.getAll(this.service.formData.value.id).subscribe(
          response => {this.service.list= response}
        );
        this.f['dateCreation'].setValue(this.service.formData.value.deteCreation);
      }
    }



    transformDate(date){
      return this.datePipe.transform(date, 'yyyy-MM-dd');
    }

    InfoForm() {
      this.service.formData = this.fb.group({
        id:null,
        dateCreation:0,
        dateLivraison:0,
        nomClient: '',
        clientId:0 ,
        totTTC:0,
        totHT:0,
        ldevis:[],
      });
    }
    ResetForm() {
      this.service.formData.reset();
    }

    AddData(ldevisIndex, Id) {
      const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width='50%';
    dialogConfig.data={ldevisIndex,Id};
    this.dialog.open(AddLignedevisComponent, dialogConfig).afterClosed().subscribe(b10=>{
      this.calcul();
    });
    }


 onDelete(item : LigneDevis,Id:number,i:number){
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
    this.f['ldevis'].setValue(this.service.list);
      this.service.saveOrUpdate(this.service.formData.value).
      subscribe( data => {
        this.toastr.success( 'Validation Faite avec Success');
        this.router.navigate(['/devis']);
      });
   }


  }
