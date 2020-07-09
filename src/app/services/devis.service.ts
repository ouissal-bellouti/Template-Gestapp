import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Devis } from 'src/app/pages/devis';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { LigneDevis } from '../pages/ligneDevis';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'http://localhost:5000'})
};
@Injectable({
  providedIn: 'root'
})
export class DevisService {


  constructor(private http:HttpClient,private toastr: ToastrService) { }

  readonly apiUrl ='http://localhost:5000/api/Devis';
  list: any={};
  public formData: FormGroup;
  choixmenu ='A';

  saveOrUpdate(info: object) {
    return this.http.post(`${this.apiUrl}`,info);
  }
  getData(Id: string): Observable<object> {
    return this.http.get(`${this.apiUrl}/${Id}`);
  }

  save(info: object){
   alert('gfgfgf');
    const body ={
      ...info,
      lcommande:this.list
    };
    return this.http.post(`${this.apiUrl}`, body);

  }
    updatedata(Id: string, value: any): Observable<object> {
      return this.http.put(`${this.apiUrl}/${Id}`, value);
    }

    deleteData(Id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${Id}`, { responseType: 'text' });
    }

    getAll(): Observable<any> {
      return this.http.get(`${this.apiUrl}`);
    }

    deleteAll(Id: string): Observable<any> {

      return this.http.delete(`${this.apiUrl}/${Id}`, { responseType: 'text' });
    }



}
