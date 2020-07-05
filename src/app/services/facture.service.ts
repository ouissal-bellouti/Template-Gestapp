import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private http:HttpClient,private toastr: ToastrService) { }

  readonly apiUrl ='http://localhost:5000/api/Facture';
  list: any={};
  public formData: FormGroup;
  choixmenu : string = 'A';


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

    saveOrUpdate(info: Object) {
      return this.http.post(`${this.apiUrl}`,info);
    }

}
