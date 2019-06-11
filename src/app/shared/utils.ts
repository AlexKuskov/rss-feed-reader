import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export function errorHandler(error: HttpErrorResponse): Observable<never> {
  return Observable.throw(error.message || "Server Error");
}

