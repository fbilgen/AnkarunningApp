
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, retry, map } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from 'rxjs/observable/of';

import { TrainingModel } from '../../models/TrainingModel';
import { DateTime } from 'ionic-angular';


@Injectable()
export class TrainingsService {

    private trainingsApiUrl: string = 'http://ankarunning.eu-west-1.elasticbeanstalk.com/api/trainings';

    constructor(
        private httpClient: HttpClient) {

    }

    getTrainings(): Observable<TrainingModel[]> { //filter:string
        return this.httpClient
            .get<TrainingModel[]>(this.trainingsApiUrl
                //,
                // {
                //     params: {
                //         lastDateTime: filter
                //     }
                // }
            )
            .pipe(
                retry(3), //retry failed request up to 3 times.
                catchError(this.handleError('gettrainings', [])) //then handle error
            );
    };

    getFutureTraining(): Observable<TrainingModel> {
        const url = `${this.trainingsApiUrl}/future`;
        return this.httpClient
            .get<TrainingModel>(url)
            .pipe(
                retry(3),
                catchError(this.handleError<TrainingModel>('getFutureTraining'))
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


    // getTrainingsResponse(): Observable<HttpResponse<TrainingModel[]>> {
    //     return this.httpClient
    //         .get<TrainingModel[]>(
    //             this.trainingApiUrl, { observe: 'response' })
    //         .pipe(
    //             retry(3), //retry failed request up to 3 times.
    //             catchError(this.handleErrorHttp) //then handle error
    //         );
    // }

    // private handleErrorHttp(error: HttpErrorResponse) {
    //     if (error.error instanceof ErrorEvent) {
    //         // A client-side or network error occurred. Handle it accordingly.
    //         console.error('An error occurred:', error.error.message);
    //     } else {
    //         // The backend returned an unsuccessful response code.
    //         // The response body may contain clues as to what went wrong,
    //         console.error(
    //             `Backend returned code ${error.status}, ` +
    //             `body was: ${error.error}`);
    //     }
    //     // return an ErrorObservable with a user-facing error message
    //     return new ErrorObservable(
    //         'Something bad happened; please try again later.');
    // };
}


