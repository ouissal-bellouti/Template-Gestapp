import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Devis } from 'src/app/pages/devis';
import { LigneDevis} from 'src/app/pages/ligneDevis';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DevisService {


  constructor(private http:HttpClient,private toastr: ToastrService) { }

  readonly apiUrl ='http://localhost:4000/api/Devis';
  list: LigneDevis[]=[];
  public formData: FormGroup;
  choixmenu = 1;

  saveOrUpdate(info: Object) {
    return this.http.post(`${this.apiUrl}`,info);
  }
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  save(info: Object){
   alert('gfgfgf');
    const body ={
      ...info,
      lcommande:this.list
    };
    return this.http.post(`${this.apiUrl}`, body);

  }
    updatedata(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.apiUrl}/${id}`, value);
    }

    deleteData(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
    }

    getAll(): Observable<any> {
      return this.http.get(`${this.apiUrl}`);
    }

    deleteAll(id: number): Observable<any> {

      return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
    }



}
