import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroupDirective, FormGroup,NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../../client';



@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  constructor(public api: ClientService, private router: Router,public fb: FormBuilder,
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
    Email: ['', [Validators.required, Validators.minLength(5)]],
    Telephone: ['', [Validators.required, Validators.minLength(8)]],
    Adress: ['', [Validators.required, Validators.minLength(10)]],
    Ville: ['', [Validators.required, Validators.minLength(8)]],
    CodePostal: ['', [Validators.required, Validators.minLength(8)]],})
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
    this.router.navigate(['/clients'])
  })
}

updateData()
  {

    this.api.updateData(this.api.dataForm.value.id,this.api.dataForm.value).
    subscribe( data => {
      this.toastr.success( 'Modification Faite avec Success');

      this.router.navigate(['/clients']);
    });
  }




}
