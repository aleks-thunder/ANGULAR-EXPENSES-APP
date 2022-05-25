import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class LoaderService {

  count: number = 0;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor() { }

  getSpinnerObserver(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  start() {
    if(++this.count === 1) {
      this.isLoading$.next(true);
    }
  }

  stop() {
    if(this.count == 0 || --this.count === 0) {
      this.isLoading$.next(false);
    }
  }
  
  reset() {
    this.count = 0;
    this.isLoading$.next(false);
  }
}
