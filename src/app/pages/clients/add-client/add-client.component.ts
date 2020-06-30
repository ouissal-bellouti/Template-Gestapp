import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroupDirective, FormGroup,NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  clientForm: FormGroup;
  Nom : '';
  Prenom :'';
  Email :'';
  Telephone : '';
  Adresse : '';
  Ville : '';
  CodePostal : null ;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();


  constructor(private router: Router, private api: ClientService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      Nom : [null, Validators.required],
      Prenom : [null, Validators.required],
      Email : [null, Validators.required],
      Telephone : [null, Validators.required],
      Address : [null, Validators.required],
      Ville : [null, Validators.required],
      CodePostale : [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addClient(this.clientForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['client-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
