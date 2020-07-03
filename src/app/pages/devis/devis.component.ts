import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DevisService } from 'src/app/services/devis.service';
import { Devis } from 'src/app/pages/devis';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { map } from 'rxjs/operators';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfmake from 'pdfmake/build/pdfmake';
import { style } from '@angular/animations';
import { LigneDevis } from '../ligneDevis';
pdfmake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-devis',
  templateUrl: 'devis.component.html'
})
export class DevisComponent implements OnInit {

  devisList: any;
  SearchText: string;

  constructor(
    private service :DevisService,private router:Router,
    private toastr :ToastrService,public fb: FormBuilder,
    private datePipe : DatePipe
  ) {}

  ngOnInit() {
    this.refreshListe();
  }

  refreshListe(){
    this.service.getAll().subscribe(
      response =>{this.devisList = response;}
     );

  }

  onDelete(id: number) {

    if (window.confirm('Are sure you want to delete this Article ?')) {
      this.service.deleteAll(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' data successfully deleted!');
            this.refreshListe();
          },
          error => console.log(error));
    }
  }

  newDevis()
  {
    this.service.choixmenu =1
  this.router.navigate(['/add-devis']);
  }

  onSelect(item :Devis){
    this.service.formData = this.fb.group(Object.assign({},item));
    this.service.choixmenu =0
    this.router.navigate(['/devis']);
  }
  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }


  getData(){
this.service.getAll().subscribe(
  response => {this.service.list = response}
);
  }

  generatepdf() {
    const document = this.getDocument();
    pdfmake.createPdf(document).open();
  }

  getDocument() {
    return {
      content: [
        [{
          text: 'InovaSquad',
          style:'name'
        },
        {
          text: 'Technopark Tanger'
        },
        {
          text: 'Lien : http://www.inovasquad.com/'
        },
        {
          text: 'Contact: Badre El Faiz'
        },
        {
          text: 'Listes Des Devis',
          bold: true,
          fontSize:20,
          alignment:'center',
          margin:[0,0,0,20]
        },
        this.getList(this.service.list),
        {

        },

        {
          text:'InovaSquad',
          style:'sign',
          alignment:'right'
        },

        ],
      ],
      styles: {
        header: {
          fontSize:18,
          bold: true,
          margin:[0,20,0,10],
          decoration: 'underline'
        },
        name: {
          fontSize: 16,
          bold: true
        },
        totale: {
          fontSize: 12,
          bold: true,
          italics: true
        },
        ligne: {
          fontSize:12,
          bold:true,
          italics: true,
        },
        sign: {
          margin: [0,50,0,10],
          alignment:'right',
          italics: true
        },
        tableHeader: {
          bold: true,
          fontSize: 15,
          alighment:'center'
        }

      }
    }
  }

  getList(item: LigneDevis[]) {
    return {
      table: {
        widths: ['*','*','*','*','*'],
        body: [
          [
            {
              text: 'DATE DE CREATION	',
              style: 'tableHeader'
            },
            {
              text: 'CLIENT',
              style: 'tableHeader'
            },
            {
              text: 'DATE DE LIVRAIOSON	',
              style: 'tableHeader'
            },
            {
              text: 'TOTALE TTC	',
              style: 'tableHeader'
            },
            {
              text: 'TOTALE HT	',
              style: 'tableHeader'
            },
          ],
          ...item.map(ed => {
            return [ed.NomCategorie, ed.Nom, ed.Designation, ed.totHT, ed.totTTC];
          })
        ]
      }
    };
  }

}
