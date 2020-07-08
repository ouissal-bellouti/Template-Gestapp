import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../pages/categorie';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  listData:Categorie[];
  public dataForm: FormGroup;
  choixmenu = 'A';

  constructor(private http: HttpClient) { }
  apiUrl ='http://localhost:5000';

  headers= {
    headers: new HttpHeaders({
      'content-Type': 'application/json'
    })
  }


  getData(Id : string){
    return this.http.get(`${this.apiUrl}/api/Categorie/${Id}`);
  }

  postData(info: Categorie): Observable<Categorie>{
    return this.http.post<Categorie>(`${this.apiUrl}/api/Categorie`,info, this.headers).pipe();
  }

  putData(Id: string, value: any): Observable<object>{
    return this.http.put(`${this.apiUrl}/api/Categorie/${Id}`,value);
  }
  deleteData(Id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/api/Categorie/${Id}`, { responseType:'text'});
}
 getAll(): Observable<any>{
  return this.http.get(`${this.apiUrl}/api/Categorie`);
}
}
