import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-utilisateurs',
  templateUrl: 'utilisateurs.component.html'
})
export class UtilisateursComponent implements OnInit {
  loading = false;
  users: User[];
  displayedColums: string[] = ['NOM','PRENOM','EMAIL','ACTIF','PROFIL','USERNAME','ACTIONS'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService) {}

  ngOnInit() {
  }
 }
