import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { of } from 'rxjs';
import { Location } from "@angular/common";
import { Router } from '@angular/router';

import { routes } from '../app-routing.module';
import { TariffListComponent } from './tariff-list.component';
import { TariffDetailsComponent } from '../tariff-details/tariff-details.component';
import { TariffService } from '../services/tariff/tariff.service';

/**
 * TO DO
 * Test that on selecting any of the sort criteria the  tariffs are displayed in the specified order
 * Test that the more and less functionality is working as it should
 */
describe('TariffListComponent', () => {
  let component: TariffListComponent;
  let fixture: ComponentFixture<TariffListComponent>;
  let tariffServiceStub: Partial<TariffService>;
  let location: Location;
  let router: Router;

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
      imports: [FontAwesomeModule, RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
      declarations: [TariffListComponent, TariffDetailsComponent],
      providers:    [ {provide: TariffService, useValue: tariffServiceStub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(TariffListComponent);
    component = fixture.componentInstance;

    // This sets up the location change listener and performs the initial navigation.
    router.initialNavigation();
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the tariffList from the tariff service', () => {
    const tariffService = fixture.debugElement.injector.get(TariffService);
    tariffService.getTariffs().subscribe((data) => {
      expect(data).toEqual(component.tariffs);
    });
  });

  it('should have <h2> with "Tariffs"', () => {
    const titleElement: HTMLElement = fixture.nativeElement;
    const p = titleElement.querySelector('h2');
    expect(p.textContent).toEqual('Tariffs');
  });

  it('should go to tariff details page when To Tariff button is clicked', fakeAsync(() => {
    const buttonElement: HTMLElement = fixture.nativeElement;
    const button = buttonElement.querySelector('button');
    button.click();
    tick();

  // expecting to navigate to id of the component's first tariff
  const id = component.tariffs[0].id;
    expect(location.path()).toBe(`/tariffs/${id}`);
  }));
});
