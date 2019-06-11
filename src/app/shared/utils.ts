import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export {errorHandler, distinct}

function errorHandler(error: HttpErrorResponse): Observable<never> {
  return Observable.throw(error.message || "Server Error");
}

function distinct<Item>(item: Item, index: number, array: Array<Item>): boolean {
  return array.indexOf(item) === index
}