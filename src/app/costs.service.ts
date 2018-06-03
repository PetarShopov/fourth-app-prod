import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Costs } from './models/costs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class CostsService {

    private costsUrl = 'api/costs';  // URL to web api

    constructor(
        private http: HttpClient,
    ) { }

    /** GET costs from the server */
    getCosts(): Observable<Costs[]> {
        return this.http.get<Costs[]>(this.costsUrl)
            .pipe(
                tap(costs => this.log(`fetched costs`)),
                catchError(this.handleError('getCosts', []))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead

            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log on a console **/
    private log(message: string) {
        console.log(message);
    }
}
