import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Produit } from 'src/app/pages/produit';
import { ajax } from 'rxjs/ajax';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {

   API_KEY = 'TestwithDohaAndOuissal';

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
    return this.http.post(`${this.API_KEY}api/upload`, formData);
  }
  deleteImage(formData) {
    return this.http.post<any>(`${this.API_KEY}api/deleteImage`, formData)
    .pipe(
      catchError(this.handleError)
    );
  }
  getProduit(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.API_KEY}`)
    .pipe(
      tap(produits => console.log('fetched produits')),
      catchError(this.handleError('getProduits', []))
    );
  }

  getProduitById(id: number): Observable<Produit> {
    const url = `${this.API_KEY}/${id}`;
    return this.http.get<Produit>(url).pipe(
      tap(_ => console.log(`fetched produits id=${id}`)),
      catchError(this.handleError<Produit>(`getProduitById id=${id}`))
    );
  }

  addProduit(produits: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.API_KEY, produits, httpOptions).pipe(
      tap((c: Produit) => console.log(`added produit w/ id=${c.id}`)),
      catchError(this.handleError<Produit>('addProduit'))
    );
  }

  updateProduit(id: number, produit: Produit): Observable<any> {
    const url = `${this.API_KEY}/${id}`;
    return this.http.put(url, produit, httpOptions).pipe(
      tap(_ => console.log(`updated produit i{id}`)),
      catchError(this.handleError<any>('updatedproduit'))
    );
  }

  deleteProduit(id: number): Observable<Produit> {
    const url = `${this.API_KEY}/${id}`;
    return this.http.delete<Produit>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted produit id=${id}`)),
      catchError(this.handleError<Produit>('deleteProduits'))
    );
  }


}
