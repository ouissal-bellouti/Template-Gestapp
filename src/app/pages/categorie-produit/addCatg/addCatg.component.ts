import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie} from '../../Categorie';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from 'src/app/services/categorie.service';
import { CategorieProduitComponent } from 'src/app/pages/categorie-produit/categorie-produit.component'



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-addCatg',
  templateUrl: './addCatg.component.html',
  styleUrls: ['./addCatg.component.css']
})
export class AddCatgComponent implements OnInit {

  listData:FormGroup;

  constructor(public api: CategorieService ,public fb: FormBuilder,public toastr: ToastrService, private matDialog: MatDialog,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AddCatgComponent>,) { }

  ngOnInit() {
    if (this.api.choixmenu === 'A')
    {this.infoForm()};
  }

  ResetForm() {
    this.api.dataForm.reset();
}
infoForm() {
  this.api.dataForm = this.fb.group({
    Id: null,
    Code: ['',[Validators.required]],
    Nom: ['',[Validators.required]]
  });
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
    this.router.navigate(['/categories']);
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
    this.router.navigate(['/categories']);
  });
}


}
