import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Client } from '../pages/client';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};



@Injectable({
  providedIn: 'root'
})
export class ClientService {
  API_KEY = 'TestwithDohaAndOuissal';
  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //  TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      //  Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getClient(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.API_KEY}`)
    .pipe(
      tap(Clients => console.log('fetched Clients')),
      catchError(this.handleError('getClients', []))
    );
  }

  getClientById(id: number): Observable<Client> {
    const url = `${this.API_KEY}/${id}`;
    return this.http.get<Client>(url).pipe(
      tap(_ => console.log(`fetched Clients id=${id}`)),
      catchError(this.handleError<Client>(`getClientById id=${id}`))
    );
  }

  addClient( client: Client): Observable<Client> {
    return this.http.post<Client>(this.API_KEY, Client, httpOptions).pipe(
      tap((c: Client) => console.log(`added Client w/ id=${c.id}`)),
      catchError(this.handleError<Client>('addClient'))
    );
  }

  updateClient(id: number, client: Client): Observable<any> {
    const url = `${this.API_KEY}/${id}`;
    return this.http.put(url, Client, httpOptions).pipe(
      tap(_ => console.log(`updated Client i{id}`)),
      catchError(this.handleError<any>('updatedClient'))
    );
  }

  deleteClient(id: number): Observable<Client> {
    const url = `${this.API_KEY}/${id}`;
    return this.http.delete<Client>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Client id=${id}`)),
      catchError(this.handleError<Client>('deleteClients'))
    );
  }

}
