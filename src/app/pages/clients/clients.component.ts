import { Component, OnInit,Inject } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from '../client';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { identifierModuleUrl } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddClientComponent } from './add-client/add-client.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-clients',
  templateUrl: 'clients.component.html'
})
export class ClientsComponent implements OnInit {

 client: Client;
 listData: Observable<Client[]>;

  constructor(public api: ClientService,
    public toaster: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddClientComponent>, ) {}

  ngOnInit(): void {
    this.getData();
    }

    addClient() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = '50%';
      this.matDialog.open(AddClientComponent, dialogConfig);
    }

    removeData(Id: string) {
      if (window.confirm('Are sure you want to delete this Categorie ?')) {
      this.api.deleteData(Id)
        .subscribe(
          data => {
            console.log(data);
            this.toaster.warning('data succefully deleted!');
            this.getData();
          },
          error => console.log(error));
    }
    }

  getData() {
    this.api.getAll().subscribe(
      response => {this.api.listData = response;}
    );
  }

  selectData(item : Client) {
    this.api.choixmenu = 'M';
    this.api.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width='50%';

    this.matDialog.open(AddClientComponent, dialogConfig);
  }




  }
