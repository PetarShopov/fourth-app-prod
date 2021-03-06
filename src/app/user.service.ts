import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './models/user';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class UserService {

    private usersUrl = 'api/users';  // URL to web api

    constructor(
        private http: HttpClient,
    ) { }

    /** GET users from the server */
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl)
            .pipe(
                tap(users => this.log(`fetched users`)),
                catchError(this.handleError('getUsers', []))
            );
    }

    /** GET user by id. Will 404 if id not found */
    getUser(id: number): Observable<User> {
        const url = `${this.usersUrl}/${id}`;
        return this.http.get<User>(url).pipe(
            tap(_ => this.log(`fetched user id=${id}`)),
            catchError(this.handleError<User>(`getUser id=${id}`))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
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
