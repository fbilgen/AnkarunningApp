var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
var TrainingsService = (function () {
    function TrainingsService(httpClient) {
        this.httpClient = httpClient;
        this.trainingsApiUrl = 'http://ankarunning.eu-west-1.elasticbeanstalk.com/api/trainings';
    }
    TrainingsService.prototype.getTrainings = function () {
        return this.httpClient
            .get(this.trainingsApiUrl
        //,
        // {
        //     params: {
        //         lastDateTime: filter
        //     }
        // }
        )
            .pipe(retry(3), //retry failed request up to 3 times.
        catchError(this.handleError('gettrainings', [])) //then handle error
        );
    };
    ;
    TrainingsService.prototype.getFutureTraining = function () {
        var url = this.trainingsApiUrl + "/future";
        return this.httpClient
            .get(url)
            .pipe(retry(3), catchError(this.handleError('getFutureTraining')));
    };
    ;
    /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
    TrainingsService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    };
    TrainingsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], TrainingsService);
    return TrainingsService;
}());
export { TrainingsService };
//# sourceMappingURL=trainings.service.js.map