import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  clientForm: FormGroup;
  id: number =null;
  Nom : '';
  Prenom :'';
  Email :'';
  Telephone : '';
  Adresse : '';
  Ville : '';
  CodePostal : number =  null ;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ClientService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getClientByid(this.route.snapshot.params.id)
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

  getClientByid(id: any) {
    this.api.getClientById(id).subscribe((data: any) => {
      this.id = data.id;
      this.clientForm.setValue({
        Nom : data.Nom,
        Prenom : data.Prenpm,
        Email : data.Email,
        Telephone : data.Telephone,
        Adress : data.Adress,
        Ville : data.Ville,
        CodePostale : data.CodePostale
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateClient(this.id, this.clientForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/Client-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  clientDetails() {
    this.router.navigate(['/client-details', this.id]);
  }

}
