import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Utilisateur } from '../utilisateur';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { identifierModuleUrl } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUtilisateurComponent } from './add-utilisateur/add-utilisateur.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-utilisateurs',
  templateUrl: 'utilisateurs.component.html'
})
export class UtilisateursComponent implements OnInit {
  utilisateurs: Utilisateur;

  listData: Observable<Utilisateur[]>;
  utilisateur: Utilisateur;


  constructor(public api: UtilisateurService,
     public toaster: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddUtilisateurComponent>, ) {}

  ngOnInit(): void {
    this.getData();
  }

  addUtilisateur() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    this.matDialog.open(AddUtilisateurComponent, dialogConfig);
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

  getData() {
    this.api.getAll().subscribe(
      response => {this.api.listData = response;}
    );
  }

  selectData(item : Utilisateur) {
    this.api.choixmenu = 'M';
    this.api.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width='50%';

    this.matDialog.open(AddUtilisateurComponent, dialogConfig);
  }

 }
