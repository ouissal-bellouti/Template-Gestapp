import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Client } from '../pages/client';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  formdata: Client;
  readonly apiUrl ='http://localhost:4000';
  clients : Client[];
  choixmenu: String = 'A';

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(`${this.apiUrl}/api/Clients`)
  }
  postData(formdata) {
    return this.http.post(`${this.apiUrl}/api/Clients`,formdata);
  }
  putData(id,formData){
    return this.http.put(`/api/Client/5${id}`,formData);
  }
  deleteData(id){
    return this.http.delete(`/api/Clients${id}`);
  }
  getDatabyId(id) {
    return this.http.get(`${this.apiUrl}/api/Clients${id}`);
  }

}
