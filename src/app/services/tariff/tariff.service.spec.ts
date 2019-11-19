import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { defer } from 'rxjs';

// import { tariffList } from '../assets/tariffs.mock';
import { TariffService, Tariff } from './tariff.service';
import tariffList from '../../../assets/tariffs.json'

export function asyncData<T>(data: Tariff[]) {
  return defer(() => Promise.resolve(data));
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
        "downloadSpeed": 10,
        "uploadSpeed": 3,
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
    }
];

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [HttpClientTestingModule], 
  //   })
  // });

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
  })

  it('should sort tariffs based on price criteria', () => {
    const sortedTariffs = tariffService.sortTariffs(tariffList, 'price');

    expect(sortedTariffs[0]).toEqual(expectedTariffs[1]);
  })
});
