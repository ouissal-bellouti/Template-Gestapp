import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Facture } from 'src/app/pages/facture';
import { LigneFacture } from 'src/app/pages/lignefacture';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LigneFactureService {
   readonly apiUrl ='http://localhost:4000/api/facture';
   listlfacture: LigneFacture[];
   lfacture: LigneFacture= new LigneFacture(); facture
   public formData: FormGroup;


  constructor(private http:HttpClient,private toastr: ToastrService) { }


  getData(id: number): Observable<Object> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addlFacture(info: Object): Observable<Object> {
    return this.http.post(`${this.apiUrl}`, info);
  }

  saveOrUpdate(info: Object): Observable<Object> {

    return this.http.post(`${this.apiUrl}`, info);
  }
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.apiUrl}/${id}`, value);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  getAll(id: number): Observable<Object> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

}
