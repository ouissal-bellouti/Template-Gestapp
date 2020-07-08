import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders,HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Client } from '../pages/client';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'http://localhost:5000'})
};
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl ='http://localhost:5000';
  choixmenu = 'A';
  listData: Client[];
  public dataForm : FormGroup;

  constructor(private http: HttpClient) { }

  getData(Id: string): Observable<object>{
    return this.http.get(`${this.apiUrl}/api/Client/${Id}`)
  }
  postData(info) : Observable<object>{
    return this.http.post(`${this.apiUrl}/api/Client/`,info);
  }
  putData(Id: string, value:any):  Observable<object>{
    return this.http.put(`${this.apiUrl}/api/Client//${Id}`,value);
  }
  deleteData(Id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/api/Client/${Id}`);
  }
 getAll():Observable<any> {
    return this.http.get(`${this.apiUrl}/api/Client/`);
  }

}
