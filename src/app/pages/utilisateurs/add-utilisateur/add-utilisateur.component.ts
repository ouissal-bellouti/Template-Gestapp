import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service'
import { FormControl, FormBuilder, FormGroupDirective, FormGroup,NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from '../../utilisateurs';
import { Router } from '@angular/router';



@Component({
    selector: 'app-add-utilisateur',
    templateUrl: './add-utilisateur.component.html',
    styleUrls: ['./add-utilisateur.component.scss']
  })
export class AddUtilisateurComponent implements OnInit {

    constructor(public api: UtilisateurService, private router: Router,public fb: FormBuilder,
       public toastr: ToastrService) { }

    ngOnInit() {
      if (this.api.choixmenu=="A")
      {this.infoForm()};

  }
  infoForm() {
    this.api.dataForm = this.fb.group({

      Id: null,
      Nom: ['', [Validators.required]],
      Prenom: ['', [Validators.required]],
      UserName: ['', [Validators.required, Validators.minLength(5)]],
      Telephone: ['', [Validators.required, Validators.minLength(8)]],
      Adresse: ['', [Validators.required, Validators.minLength(10)]],
      Type: ['', [Validators.required, Validators.minLength(8)]],
      Password: ['', [Validators.required, Validators.minLength(8)]],})
    }

  Resetform() {
    this.api.dataForm.reset();
  }

  onSubmit() {
    if (this.api.choixmenu == "A")
    {
      this.addData();
    }
    else
    {

     this.updateData()
    }
  }

  addData() {
    this.api.createData(this.api.dataForm.value).
    subscribe( data => {
      this.toastr.success('Validation Faite avec Success');
      this.router.navigate(['/utilisateurs'])
    })
  }

  updateData()
    {

      this.api.updateData(this.api.dataForm.value.id,this.api.dataForm.value).
      subscribe( data => {
        this.toastr.success( 'Modification Faite avec Success');

        this.router.navigate(['/utilisateurs']);
      });
    }

  }
