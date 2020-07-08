import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { FactureService } from 'src/app/services/facture.service';
import { Article } from '../../article';
import { ArticleService } from 'src/app/services/article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Produit } from '../../produit';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { DevisService } from 'src/app/services/devis.service';
import {Parse} from 'parse';




@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {


  formData: FormGroup;
  produitList: Produit[];
  isValid: boolean;
  iPrixTTC=0;
  iPrixTVA=0;


  constructor(
    public service: ArticleService,
    private toaster: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddArticleComponent>,
    private produitService: ApiService,
    private devisService: DevisService,
    public fb: FormBuilder ) { }

  get f() {  return this.formData.controls;}

  ngOnInit(): void {

    if(this.data.articleIndex==null)
    {
      this.InfoForm();
    }
    else
    {
     this.formData =this.fb.group(Object.assign({},this.devisService.list[this.data.articleIndex]));
    }
  }

  onSubmit() {

    if(this.data.itemIndex==null)
    {
      this.devisService.list.push(this.formData.value)
      this.dialogRef.close();
    }
    else
  {

    this.devisService.list[this.data.itemIndex] = this.formData.value;
  }
  this.dialogRef.close();

  }

InfoForm() {
  this.formData = this.fb.group({
      Id: null,
      Nom: ['',[Validators.required]],
      Quantite :  ['',[Validators.required]],
      PrixTTC :  ['',[Validators.required]],
      TVA:  ['',[Validators.required]],
      Designation: ['',[Validators.required]],
    });
  }


  selectPrix(ctrl){
    if(ctrl.selectedIndex==0){
      this.f['PrixHT'].setValue(0);
      this.f['TVA'].setValue(0);
      this.f['Quantite'].setValue(0);
    }
    else {
      this.f['PrixHT'].setValue(this.formData[ctrl.selectedIndex-1].PrixHT);
      this.f['TVA'].setValue(this.formData[ctrl.selectedIndex-1].TVA);
    }
  }

  calcul() {
    this.iPrixTTC =parseFloat((this.formData.value.Quantite * this.formData.value.PrixHT).toFixed(3));
    this.iPrixTVA =parseFloat((this.iPrixTTC + this.formData.value.TVA).toFixed(3));

    this.f['PrixTTC'].setValue(this.iPrixTTC);
  }

  validateForm(formData: Article){
    this.isValid=true;
    if(formData.Id==='')
      this.isValid=false;
      else if(formData.Quantite===0)
      this.isValid=false;
      return this.isValid;
  }

}
