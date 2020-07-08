import { Component, OnInit } from '@angular/core';
import { Client } from '../../client';
import { FactureService } from 'src/app/services/facture.service';
import { ClientService } from 'src/app/services/client.service';
import { ArticleService } from 'src/app/services/article.service';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Article } from '../../article';


@Component({
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.scss']
})

export class AddFactureComponent implements OnInit {
  ngOnInit(): void {}
}
