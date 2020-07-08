import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormBuilder, FormGroupDirective, FormGroup,NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../../client';
import { ClientsComponent } from '../clients.component';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  listData:FormGroup;
  dataForm:FormGroup;

  constructor(public api: ClientService ,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private matDialog: MatDialog,
    private router : Router,@Inject(MAT_DIALOG_DATA)
    public data,
    public dialogRef:MatDialogRef<AddClientComponent>
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
    Email: ['', [Validators.required, Validators]],
    Telephone: ['', [Validators.required, Validators]],
    Adresse: ['', [Validators.required, Validators]],
    Ville: ['', [Validators.required, Validators]],
    CodePostal: ['', [Validators.required, Validators]]
  })
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
    this.router.navigate(['/clients']);
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
    this.router.navigate(['/clients']);
  });
}


}
