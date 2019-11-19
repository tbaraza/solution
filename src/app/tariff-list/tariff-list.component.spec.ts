import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable, of } from 'rxjs';

import { TariffListComponent } from './tariff-list.component';
import { TariffService } from '../services/tariff/tariff.service';

describe('TariffListComponent', () => {
  let component: TariffListComponent;
  let fixture: ComponentFixture<TariffListComponent>;
  let tariffServiceStub: Partial<TariffService>;

  tariffServiceStub = {
  getTariffs: () => of(
    [
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
        ],
        showMore: true,
        showLess: false,
        benefitsToDisplay: 3
      }
  ]
  ),
};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [TariffListComponent],
      providers:    [ {provide: TariffService, useValue: tariffServiceStub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TariffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the tariffList from the service', () => {
    const tariffService = fixture.debugElement.injector.get(TariffService);
    tariffService.getTariffs().subscribe((data) => {
      expect(data).toEqual(component.tariffs);
    });
  });
});
