import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../pages/categorie';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  readonly apiUrl ='http://localhost:4000';
  categories : Categorie[];
  listData= Categorie;
  public dataForm: FormGroup;
  choixmenu = 'A';

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  getData(id : number){
    return this.http.get(`${this.apiUrl}/api/Categories/${id}`);
  }

  postData(info: Object): Observable<Object>{
    return this.http.post(`${this.apiUrl}/api/Categories`,info);
  }

  putData(id: number, value: any): Observable<Object>{
    return this.http.put(`${this.apiUrl}/api/Categories/${id}`,value);
  }
  deleteData(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/api/Categories/${id}`, { responseType:'text'});
}
 getAll(): Observable<any>{
  return this.http.get(`${this.apiUrl}/api/Categories`);
}
}