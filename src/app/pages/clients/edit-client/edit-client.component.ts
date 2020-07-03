import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  ClientForm: FormGroup;
  data: any;
  submitted= false;
  EventValue: any ='Save';



  constructor(private router: Router, private route: ActivatedRoute, private api: ClientService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getdatabyId(this.data.id);

    this.ClientForm = new FormGroup({
      Id: new FormControl(null),
      Nom: new FormControl('',[Validators.required]),
      Prenom: new FormControl('',[Validators.required]),
      Email:new FormControl('',[Validators.required]),
      Telephone: new FormControl('',[Validators.required]),
      Address: new FormControl('',[Validators.required]),
      Ville: new FormControl('',[Validators.required]),
      Codepostale: new FormControl('',[Validators.required]),
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
  getdatabyId(id: any) {
    this.api.getDatabyId(id).subscribe((data: any) => {
      this.data = data.id;
    })
  }

  restForm(client?: NgForm) {
    this.ClientForm.reset();
    this.EventValue = 'Update';
    this.submitted = false;
  }





}
