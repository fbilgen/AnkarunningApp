import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { RouteModel } from "../../models/RouteModel";
import { retry, catchError, map } from "rxjs/operators";
import { Route } from "@angular/compiler/src/core";


@Injectable()
export class RoutesService {

    private routesApiUrl: string = "http://ankarunning.eu-west-1.elasticbeanstalk.com/api/routes/";

    constructor(
        private httpClient: HttpClient) {

    }

    getRoute(routeId: string): Observable<RouteModel> {
        const url = this.routesApiUrl + routeId;
        return this.httpClient
            .get<RouteModel>(url, {
                params: {
                    routeId: routeId
                }
            })
            .pipe(
                retry(3),
                catchError(this.handleError<RouteModel>('getRoute'))
            );
    };

    getRoutes(): Observable<RouteModel[]> {
        const url = this.routesApiUrl;
        return this.httpClient
            .get<RouteModel[]>(url)
            .pipe(
                retry(3),
                catchError(this.handleError('getRoutes', []))
            );
    };


    /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}