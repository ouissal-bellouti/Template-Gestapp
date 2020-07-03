import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Produit } from 'src/app/pages/produit';
import { ajax } from 'rxjs/ajax';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';



const httpOptions = {
  headers: new HttpHeaders({'': ''})
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  environment: any;
  choixmenu : string  = 'A';
  listData : Produit[];
  public dataForm:  FormGroup;


  constructor(private http: HttpClient) { }



  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
  uploadImage(formData) {
    return this.http.post(`${this.environment.apiUrl}/api/upload`, formData);
  }
  deleteImage(formData) {
    return this.http.post<any>(`${this.environment.apiUrl}/api/deleteImage`, formData)
    .pipe(
      catchError(this.handleError)
    );
  }
  getProduit(): Observable<any> {
    return this.http.get(`${this.environment.apiUrl}`);
  }

  getProduitById(id: number): Observable<Object> {
    return this.http.get(`${this.environment.apiUrl}/${id}`);
  }

  addProduit(formData: FormData): Observable<any> {
    return this.http.post(`${this.environment.apiUrl}`, formData);
  }

  updateProduit(id: number, value: any): Observable<any> {
    return this.http.put(`${this.environment.apiUrl}/${id}`, value);
  }

  deleteProduit(id: number): Observable<any> {
    return this.http.delete(`${this.environment.apiUrl}/${id}`, { responseType: 'text' });
  }


}
