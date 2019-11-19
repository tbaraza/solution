import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export type Tariff = {
  id: number,
  name: string,
  speed: {
    downloadSpeed: number,
    uploadSpeed: number,
    metric: string
  },
  price: number,
  benefits: string[]
}

export type FilterCriteria = 'recommended' | 'downloadSpeed' | 'uploadSpeed' | 'price';

@Injectable({
  providedIn: 'root'
})

export class TariffService {
  constructor(
    private http: HttpClient
  ) {}

  getTariffs() {
    return this.http.get('/assets/tariffs.json')
    .pipe(catchError(() => {
      return throwError('Error on fetching tariffs');
    }));
  }
  
  sortTariffs(tariffs: Tariff[], criteria: FilterCriteria) {
    if (criteria === 'uploadSpeed' || criteria === 'downloadSpeed') {
      return tariffs.sort((a: Tariff ,b: Tariff) => a.speed[criteria] -  b.speed[criteria]);
    } else if (criteria === 'price') {
      return tariffs.sort((a: Tariff ,b: Tariff) => a[criteria] -  b[criteria]);
    } else {
      throw new Error('Invalid sort criteria');
    }
  }
}