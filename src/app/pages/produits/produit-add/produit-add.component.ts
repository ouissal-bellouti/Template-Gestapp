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
interface Categorie {
  value: string;
}
interface Unite {
  value: string;
}

@Component({
  selector: 'app-produit-add',
  templateUrl: './produit-add.component.html',
  styleUrls: ['./produit-add.component.scss']
})
export class ProduitAddComponent implements OnInit {
  produitForm: FormGroup;
  error: string;
  uploadError: string;
  @ViewChild('image') private image: ElementRef;
  @Output() close = new EventEmitter();
  id: number = null;
  prix: number = null;
  tva: number = null;
  description: '';
  unites: Unite[] = [
    { value: 'cm' },
    { value: 'cm2' },
    { value:'cm3' },
    { value:'m' },
    { value:'m2' },
    { value:'m3' },
    { value:'kg' },
    { value:'L' }
  ];
  reference: number = null;
  designation: '';
  categories: Categorie[] = [
    { value: 'Peinture'},
    { value: 'Pièce auto'},
    { value: 'Phones'},
    { value: 'Idk'},
    { value: 'Smtgs'}
  ];
  stock: '';
  isLoadingResults = false;
  matcher = new ErrorStateMatcher();


  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.produitForm = this.formBuilder.group({
      id : [null, Validators.required],
      prix : [null, Validators.required],
      tva : [null, Validators.required],
      description : [null, Validators.required],
      unite : [null, Validators.required],
      reference : [null, Validators.required],
      designation : [null, Validators.required],
      categorie : [null, Validators.required],
      stock : [null, Validators.required]
    });
  }

  onSelectedFile(event) {
    this.isLoadingResults = true;
    if (event.target.files.length > 0) {
      const productImage = event.target.files[0];

      const formData = new FormData();
      formData.append('productImage', productImage);
      this.api.uploadImage(formData).subscribe(
        res => {
          this.isLoadingResults = true;
            const li: HTMLLIElement = this.renderer.createElement('li');

            const img: HTMLImageElement = this.renderer.createElement('img');
            this.renderer.addClass(img, 'product-image');

            const a: HTMLAnchorElement = this.renderer.createElement('a');
            a.innerText = 'Delete';
            this.renderer.addClass(a, 'delete-btn');
            a.addEventListener('click', this.api.deleteImage.bind(this.isLoadingResults =false, a));

            this.renderer.appendChild(this.image.nativeElement, li);
            this.renderer.appendChild(li, img);
            this.renderer.appendChild(li, a);
          }, (err: any) => {
            console.log(err);
            this.isLoadingResults = false;
           }
      );
    }
  }

  deleteProductImage(filename, a) {
    const formData = new FormData();
    formData.append('filename', filename);
    this.api.deleteImage(formData).subscribe(
      res => {
        a.parentElement.remove();
      },
      err => this.error = err
    );
  }
  onFormsubmit() {
    this.isLoadingResults = true;
    this.api.addProduit(this.produitForm.value)
      .subscribe((res: any) => {
        const id = res.id;
        this.isLoadingResults =false;
        this.router.navigate(['/produit-detail', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
       });
  }
  onClose(data: any) {
    this.close.emit(data);
  }

}
