import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroupDirective, FormGroup,NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';



@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {


  data: any;
  ClientForm: FormGroup;
  submitted = false;
  EventValue: any = 'Save';



  constructor(private api: ClientService, private router: Router,) { }

  ngOnInit(): void {

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

Save() {
  this.submitted = true;
  if (this.ClientForm.invalid) {
    return;
  }
  this.api.postData(this.ClientForm.value).subscribe((data: any[]) =>
  {
    this.data = data;
    this.restForm();

  })
}

restForm() {

  this.ClientForm.reset();
  this.EventValue = 'Save';
  this.submitted = false;
}


}
