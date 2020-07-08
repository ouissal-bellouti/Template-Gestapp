import { Component, OnInit, Inject } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service'
import { FormControl, FormBuilder, FormGroupDirective, FormGroup,NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from '../../utilisateur';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'app-add-utilisateur',
    templateUrl: './add-utilisateur.component.html',
    styleUrls: ['./add-utilisateur.component.scss']
  })

export class AddUtilisateurComponent implements OnInit {

    constructor(public api: UtilisateurService, public fb: FormBuilder,
      public toastr: ToastrService,
    private matDialog: MatDialog,
    private router : Router,@Inject(MAT_DIALOG_DATA)
    public data,
    public dialogRef:MatDialogRef<AddUtilisateurComponent>
      ) { }

    ngOnInit() {
      if (this.api.choixmenu==='A')
    {this.infoForm()};

    }


    infoForm() {
      this.api.dataForm = this.fb.group({
        Id: null,
        Nom: ['', [Validators.required]],
        Prenom: ['', [Validators.required]],
        UserName: ['', [Validators.required, Validators]],
        Telephone: ['', [Validators.required, Validators]],
        Adresse: ['', [Validators.required, Validators]],
        Type: ['', [Validators.required]],
        Password: ['', [Validators.required, Validators]],})
      }

    onSubmit() {

      if (this.api.choixmenu === 'A')
      {
        this.addData();
      }
      else
      {

       this.updateData()
      }
    }

    addData() {
      this.api.postData(this.api.dataForm.value).
      subscribe( data => {
        this.dialogRef.close();

        this.api.getAll().subscribe(
          response =>{this.api.listData = response;}
         );
        this.router.navigate(['/utilisateurs']);
      });
    }

    updateData()
{
  this.api.putData(this.api.dataForm.value.Id,this.api.dataForm.value).
  subscribe( data => {
    this.dialogRef.close();

    this.api.getAll().subscribe(
      response =>{this.api.listData = response;}
     );
    this.router.navigate(['/utilisateurs']);
  });
}
  }

