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

  public apiUrl ='http://localhost:5000/api/Client';
  choixmenu: String = 'A';
  public dataForm : FormGroup;

  constructor(private http: HttpClient) { }

  getData(Id: number): Observable<Object>{
    return this.http.get(`${this.apiUrl}/${Id}`)
  }
  createData(info) : Observable<Object>{
    return this.http.post(`${this.apiUrl}`,info);
  }
  updateData(id: number, value:any):  Observable<Object>{
    return this.http.put(`${this.apiUrl}/${id}`,value);
  }
  deleteData(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}${id}`);
  }
  public getAll():Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

}
