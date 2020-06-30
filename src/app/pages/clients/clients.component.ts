import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from '../client';
import { Router } from '@angular/router';



@Component({
  selector: 'app-clients',
  templateUrl: 'clients.component.html'
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = ['Nom', 'Prenom', 'Email', 'Telephone', 'Adresse', 'Ville', 'CodePostale'] ;
  data: Client[] = [];
  clients = [];
  isLoadingResults = true;
  client : Client = { id: null, Nom:'', Prenom:'', Email:'', Telephone:'', Adresse:'', Ville:'', CodePostal: null }

  constructor(private api: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.api.getClient().subscribe((res: any) => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
  deleteClient(id: any) {
    this.isLoadingResults = true;
    this.api.deleteClient(id)
    .subscribe(res => {
      this.isLoadingResults = false;
      this.router.navigate(['/clients']);
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}
