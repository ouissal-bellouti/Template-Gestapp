import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { DevisService } from 'src/app/services/devis.service';
import { LigneDevisService } from 'src/app/services/ligne-devis.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { LigneDevis } from '../../ligneDevis';
import { Produit } from '../../produit';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-add-lignedevis',
  templateUrl: './add-lignedevis.component.html',
  styleUrls: ['./add-lignedevis.component.scss']
})
export class AddLignedevisComponent implements OnInit {
  formData: FormGroup;
  produitList: Produit[];
  isValid:boolean=true;

  wtotHT =0;
  wTVA = 0;
  wtotTTC = 0;


  constructor(public service:LigneDevisService,private toastr :ToastrService,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AddLignedevisComponent>,
    private articleService:ApiService,
    private commandeService:DevisService,public fb: FormBuilder){}
    get f() { return this.formData.controls;}



  ngOnInit(): void {
    if(this.data.ldevisindex==null)
    {
      this.InfoForm();
    }
    else
    {
     this.formData =this.fb.group(Object.assign({},this.commandeService.list[this.data.ldevisIndex]));
    }
   this.articleService.getProduit().subscribe(
      response =>{this.produitList= response;}
     );
  }

  InfoForm() {
    this.formData = this.fb.group({
      id: null,
      Nom: '',
      NomCategorie: '',
      IdCategorie: null,
      Quantite : 0,
      Designation : '',
      TVA : 0,
      totHT : 0,
      prixHT: 0,
      totTTC: 0,
    })
  }

  selectPrice(ctrl){
    if(ctrl.selectedIndex === 0){
      this.f.prixHT.setValue(0);
      this.f.TVA.setValue(0);
      this.f[''].setValue('');
      this.f.qte.setValue(0);
    }
    else{
      this.f.prixHT.setValue(this.produitList[ctrl.selectedIndex-1].prix);
      this.f.TVA.setValue(this.produitList[ctrl.selectedIndex-1].tva);
      this.f.IdCategorie.setValue(this.produitList[ctrl.selectedIndex - 1].idCategorie);
      this.f.id.setValue( this.produitList[ctrl.selectedIndex - 1].id);
    }
    this.cal();
  }

  cal(){

    this.wtotHT =  parseFloat((this.formData.value.Quantite * this.formData.value.prixHT).toFixed(3));
    this.wTVA = parseFloat(((this.wtotHT * this.formData.value.tva)*0.01).toFixed(3));
    this.wtotTTC = parseFloat((this.wtotHT + this.wTVA).toFixed(3));
    this.f.totHT.setValue(this.wtotHT);
    this.f.TVA.setValue(this.wTVA);
    this.f.totTTC.setValue(this.wtotTTC);
  }

  onSubmit() {

    if(this.data.ldevisIndex==null)
    {
      this.commandeService.list.push(this.formData.value)
      this.dialogRef.close();
    }
    else
  {

    this.commandeService.list[this.data.ldevisIndex] = this.formData.value;
  }
  this.dialogRef.close();


  }

  validateForm(formData: LigneDevis){
    this.isValid=true;
    if(formData.id===0)
      this.isValid=false;
      else if(formData.Quantite ===0)
      this.isValid=false;
      return this.isValid;
  }


    }


