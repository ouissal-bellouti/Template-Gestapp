import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DevisService } from 'src/app/services/devis.service';
import { Devis } from 'src/app/pages/devis';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Component({
  selector: 'app-devis',
  templateUrl: 'devis.component.html'
})
export class DevisComponent implements OnInit {

  devisList;
  SearchText: string;

  constructor(
    private service :DevisService,private router:Router,
    private toastr :ToastrService,public fb: FormBuilder,
    private datePipe : DatePipe
  ) {}

  ngOnInit() {
    this.refreshListe();
  }

  refreshListe(){
    this.service.getAll().subscribe(
      response =>{this.devisList = response;}
     );

  }

  onDelete(id: number) {

    if (window.confirm('Are sure you want to delete this Article ?')) {
      this.service.deleteAll(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' data successfully deleted!');
            this.refreshListe();
          },
          error => console.log(error));
    }
  }

  newDevis()
  {
    this.service.choixmenu =1
  this.router.navigate(['/add-devis']);
  }

  onSelect(item :Devis){
    this.service.formData = this.fb.group(Object.assign({},item));
    this.service.choixmenu =0
    this.router.navigate(['/devis']);
  }
  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

}
