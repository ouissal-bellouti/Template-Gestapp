import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Utilisateur } from '../pages/utilisateur';
import { environment } from 'src/environments/environment';
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
  public apiUrl ='http://localhost:5000';
  choixmenu= 'A';
  public dataForm: FormGroup;
  listData: Utilisateur[];
  constructor(private http: HttpClient) { }

  getData(Id: string): Observable<Utilisateur>{
    return this.http.get<Utilisateur>(`${this.apiUrl}/api/Utilisateurs/${Id}`)
  }
  postData(info) : Observable<Utilisateur>{
    return this.http.post<Utilisateur>(`${this.apiUrl}/api/Utilisateurs`,info);
  }
  putData(Id: string, value:any):  Observable<object>{
    return this.http.put(`${this.apiUrl}/api/Utilisateurs/${Id}`,value);
  }
  deleteData(Id: string): Observable<Utilisateur>{
    return this.http.delete<Utilisateur>(`${this.apiUrl}/api/Utilisateurs/${Id}`);
  }
  public getAll():Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/api/Utilisateurs`).pipe();
  }

}
