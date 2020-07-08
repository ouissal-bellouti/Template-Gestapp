import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CategorieService } from 'src/app/services/categorie.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCatgComponent } from './addCatg/addCatg.component';
import { Categorie } from '../categorie';

@Component({
  selector: 'app-categorie-produit',
  templateUrl: './categorie-produit.component.html',
  styleUrls: ['./categorie-produit.component.scss']
})
export class CategorieProduitComponent implements OnInit {
  categorie: Categorie;

  constructor(public api: CategorieService,
    public toaster: ToastrService, private router: Router,
     public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddCatgComponent>,) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.api.getAll().subscribe(
      response => {this.api.listData = response;}
    );
  }
  addCategorie() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    this.matDialog.open(AddCatgComponent, dialogConfig);
  }

  removeData(Id: string) {
    if (window.confirm('Are sure you want to delete this Categorie ?')) {
    this.api.deleteData(Id)
      .subscribe(
        data => {
          console.log(data);
          this.toaster.warning('data succefully deleted!');
          this.getData();
        },
        error => console.log(error));
  }
  }

  selectData(item : Categorie) {
    this.api.choixmenu = 'M';
    this.api.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width='50%';

    this.matDialog.open(AddCatgComponent, dialogConfig);
  }

  }




