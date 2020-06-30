import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Produit } from '../produit';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-produits',
  templateUrl: 'produits.component.html'


})
export class ProduitsComponent implements OnInit {

  produits = [];
  isLoadingResults = true;
  apiservice: any;
  produit: Produit = { id: null, prix: null, tva: null, description:'',unite: '' , reference: null, designation: '',
  categorie: '' ,
  stock: ''};

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiservice.sendGetRequest().subscribe((data: any[])=>{
      console.log(data);
      this.produits = data['this.produit'];
    });
  }
  getProduitDetail(id: number){
    this.api.getProduitById(id)
    .subscribe((data: any) =>{
      this.produit = data;
      console.log(this.produit);
      this.isLoadingResults = false;
    });
  }
  deleteProduit(id: any) {
    this.isLoadingResults = true;
    this.api.deleteProduit(id)
    .subscribe(res => {
      this.isLoadingResults = false;
      this.router.navigate(['/produits']);
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}
