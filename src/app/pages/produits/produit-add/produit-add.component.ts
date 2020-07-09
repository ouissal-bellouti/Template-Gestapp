import { Component, OnInit, Renderer2, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
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
  selector: 'app-produit-add',
  templateUrl: './produit-add.component.html',
  styleUrls: ['./produit-add.component.scss']
})
export class ProduitAddComponent implements OnInit {

  produitForm: FormGroup;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder, private renderer: Renderer2) { }

  ngOnInit(): void {

  }



  deleteProductImage(filename, a) {
    const formData = new FormData();
    formData.append('filename', filename);
    this.api.deleteImage(formData).subscribe(
      res => {
        a.parentElement.remove();
      }
    );
  }

 onFormsubmit() {
      this.api.addProduit(this.produitForm.value)
        .subscribe((res: any) => {
          const id = res.id;
          this.router.navigate(['/produit-detail', id]);
        }, (err: any) => {
          console.log(err);
         });
    }



}
