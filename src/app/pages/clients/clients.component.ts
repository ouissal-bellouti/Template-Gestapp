import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from '../client';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { identifierModuleUrl } from '@angular/compiler';



@Component({
  selector: 'app-clients',
  templateUrl: 'clients.component.html'
})
export class ClientsComponent implements OnInit {
  data: any;
  ClientForm: FormGroup;
  submitted = false;
  EventValue: any = 'Save';

  constructor(private api: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.getdata();

    this.ClientForm = new FormGroup({
      Id: new FormControl(null),
      Nom: new FormControl('',[Validators.required]),
      Prenom: new FormControl('',[Validators.required]),
      Email:new FormControl('',[Validators.required]),
      Telephone: new FormControl('',[Validators.required]),
      Adresse: new FormControl('',[Validators.required]),
      Ville: new FormControl('',[Validators.required]),
      CodePostale: new FormControl('',[Validators.required]),

    })

  }
  postdata(form: NgForm) {
    this.api.postData(this.ClientForm.value).subscribe((data: any) => {
      this.data = data;
      this.restForm();
    }
    )
  }
  getdata() {
    this.api.getData().subscribe((data: any[]) => {
      this.data = data;
    })
  }
  deleteData(id) {
    this.api.deleteData(id).subscribe((data: any[]) => {
      this.data = data;
      this.getdata();
    })
  }

  Update() {
    this.submitted = true;

    if (this.ClientForm.invalid) {
     return;
    }
    this.api.putData(this.ClientForm.value.ClientId,this.ClientForm.value).subscribe((data: any[]) => {
      this.data = data;
      this.restForm();
    })
  }
  EditData(Data) {
    this.ClientForm.controls.Id.setValue(Data.Id);
    this.ClientForm.controls.Nom.setValue(Data.Nom);
    this.ClientForm.controls.Prenom.setValue(Data.Prenom);
    this.ClientForm.controls.Email.setValue(Data.Email);
    this.ClientForm.controls.Telephone.setValue(Data.Telephone);
    this.ClientForm.controls.Adresse.setValue(Data.Adresse);
    this.ClientForm.controls.Ville.setValue(Data.Ville);
    this.EventValue = 'Update';
  }

  restForm(client?: NgForm) {
    this.getdata();
    this.ClientForm.reset();
    this.EventValue = "Save";
    this.submitted = false;
  }

}
