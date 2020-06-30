import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Client } from '../../client';



@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  client : Client = { id: null, Nom:'', Prenom:'', Email:'', Telephone:'', Adresse:'', Ville:'', CodePostal: null }
  isLoadingresults = true;

  constructor(private route: ActivatedRoute, private api: ClientService, private router: Router) { }

  getclientDetails(id: number) {
    this.api.getClientById(id)
      .subscribe((data: any) => {
        this.client = data;
        console.log(this.client);
        this.isLoadingresults = false;
      });
  }

  ngOnInit(): void {
    this.getclientDetails(this.route.snapshot.params.id);
  }

}
