import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Utilisateur } from '../pages/utilisateurs';
import { environment } from 'src/environments/environment'
import { FormGroup } from '@angular/forms';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'http://localhost:5000'})
};


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  public apiUrl ='http://localhost:5000/api/Utilisateurs';
  choixmenu: String = 'A';
  public dataForm: FormGroup;

  constructor(private http: HttpClient) { }

  getData(Id: number): Observable<Object>{
    return this.http.get(`${this.apiUrl}/${Id}`)
  }
  createData(info) : Observable<Object>{
    return this.http.post(`${this.apiUrl}`,info);
  }
  updateData(Id: number, value:any):  Observable<Object>{
    return this.http.put(`${this.apiUrl}/${Id}`,value);
  }
  deleteData(Id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}${Id}`);
  }
  public getAll():Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

}
