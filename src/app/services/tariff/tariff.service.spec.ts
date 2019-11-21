import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { defer } from 'rxjs';

import { TariffService, Tariff } from './tariff.service';

// TO DO: Move this to a test util file
// Create async observable
export function asyncData<T>(data: Tariff[]) {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('TariffService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let tariffService: TariffService;

  const expectedTariffs = [
    {
      "id": 454,
      "name": "Tariff D",
      "speed": {
        "downloadSpeed": 40,
        "uploadSpeed": 20,
        "metric": "Mbit/s"
      },
      "price": 299.5,
      "benefits": [
        "Tariff Benefit 1",
        "Tariff Benefit 2",
        "Tariff Benefit 3",
        "Tariff Benefit 4",
        "Tariff Benefit 5"
      ]
    },
    {
      "id": 98,
      "name": "Tariff E",
      "speed": {
        "downloadSpeed": 7,
        "uploadSpeed": 5,
        "metric": "Mbit/s"
      },
      "price": 99.5,
      "benefits": [
        "Tariff Benefit 1",
        "Tariff Benefit 2",
        "Tariff Benefit 3",
        "Tariff Benefit 4",
        "Tariff Benefit 5"
      ]
    },
    {
      "id": 908,
      "name": "Tariff E",
      "speed": {
        "downloadSpeed": 10,
        "uploadSpeed": 3,
        "metric": "Mbit/s"
      },
      "price": 100.5,
      "benefits": [
        "Tariff Benefit 1",
        "Tariff Benefit 2",
        "Tariff Benefit 3",
        "Tariff Benefit 4",
        "Tariff Benefit 5"
      ]
    }
];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
    })
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    tariffService = new TariffService(<any> httpClientSpy);
  })

  it('should be created', () => {
    const service: TariffService = TestBed.get(TariffService);
    expect(service).toBeTruthy();
  });

  it('should get tariffs', () => {
    httpClientSpy.get.and.returnValue(asyncData(expectedTariffs));

    tariffService.getTariffs().subscribe(
      tariffs => {
        expect(tariffs).toEqual(expectedTariffs, 'expected tariffs'),
      fail
      });
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should throw an error when get tariffs request fails', () => {
    const errorMessage = 'something bad happened!';

    httpClientSpy.get.and.returnValue(asyncError(errorMessage));
    
    tariffService.getTariffs().subscribe(
      (tariffs: Tariff[]) => {
        expect(tariffs.length).toEqual(0),
        ((err: string) => {
          expect(err).toEqual(errorMessage);
        });
      });

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should sort tariffs based on price criteria', () => {
    tariffService.sortTariffs(expectedTariffs, 'price');

    expect(expectedTariffs[0].id).toEqual(98);
    expect(expectedTariffs[1].id).toEqual(908);
    expect(expectedTariffs[2].id).toEqual(454);
  });

  it('should sort tariffs based on upload speed criteria', () => {
    tariffService.sortTariffs(expectedTariffs, 'uploadSpeed');

    expect(expectedTariffs[0].id).toEqual(908);
    expect(expectedTariffs[1].id).toEqual(98);
    expect(expectedTariffs[2].id).toEqual(454);
  });

  it('should sort tariffs based on download speed criteria', () => {
    tariffService.sortTariffs(expectedTariffs, 'downloadSpeed');

    expect(expectedTariffs[0].id).toEqual(98);
    expect(expectedTariffs[1].id).toEqual(908);
    expect(expectedTariffs[2].id).toEqual(454);
  });
});
