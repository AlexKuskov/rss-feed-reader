import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Utils {
  static errorHandler(error: HttpErrorResponse): Observable<never> {
    return Observable.throw(error.message || "Server Error");
  }
}
