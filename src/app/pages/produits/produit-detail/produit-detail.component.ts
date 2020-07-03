import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from 'src/app/pages/produit';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.scss']
})
export class ProduitDetailComponent implements OnInit {

  produit: Produit = { id: null, prix: null, tva: null, description:'',unite: '' , designation: '',
  idCategorie: null ,
  idStock: null };
  isloadinResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  getProduitDetail(id: number){
    this.api.getProduitById(id)
    .subscribe((data: any) =>{
      this.produit = data;
      console.log(this.produit);
      this.isloadinResults = false;
    });
  }
  ngOnInit(): void {
    this.getProduitDetail(this.route.snapshot.params.id);
  }

}
