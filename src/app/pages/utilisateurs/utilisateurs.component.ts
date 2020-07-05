import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Utilisateur } from '../utilisateurs';
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


  constructor(public api: UtilisateurService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddUtilisateurComponent>, ) {}

  ngOnInit(): void {

    this.getData();

    }

    getData() {
      this.listData = this.api.getAll();

    }

    addutilisateur()
  {
    this.api.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddUtilisateurComponent, dialogConfig);
  }

  removeData(Id: number) {
    if (window.confirm('Est ce que vous sur de vouloir supprimer cet utilisateur?')) {
    this.api.deleteData(Id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success(' data successfully deleted!');
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Utilisateur) {
    this.api.choixmenu = "M";
    this.api.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";

    this.matDialog.open(AddUtilisateurComponent, dialogConfig);
  }
 }
