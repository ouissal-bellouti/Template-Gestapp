import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Devis } from 'src/app/pages/devis';
import { LigneDevis } from 'src/app/pages/ligneDevis';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';




@Injectable({
  providedIn: 'root'
})
export class LigneDevisService {
   readonly apiUrl ='http://localhost:5000/api/Article';
   listldevis : LigneDevis[];
   ldevis: LigneDevis= new LigneDevis();
   public formData: FormGroup;

  constructor(private http:HttpClient,private toastr: ToastrService) { }


  getData(id: number): Observable<Object> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addldevis(info: Object): Observable<Object> {
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
