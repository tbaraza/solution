import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { faChevronRight, faLongArrowAltDown, faLongArrowAltUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { Tariff, FilterCriteria, TariffService } from '../services/tariff/tariff.service';

const DEFAULT_NUMBER_OF_BENEFITS_TO_DISPLAY = 3;

export type ExtendedTariff = Tariff & { 
  showMore: boolean,
  showLess: boolean,
  benefitsToDisplay: number
}

@Component({
  selector: 'app-tariff-list',
  templateUrl: './tariff-list.component.html',
  styleUrls: ['./tariff-list.component.sass']
})

export class TariffListComponent implements OnInit {
  tariffs: Tariff[] = [];
  sortFilters = [
      {
          label: 'recommended',
          value: 'recommended'
      },
      {
          label: 'download speed',
          value: 'downloadSpeed'
      },
      {
          label: 'upload speed',
          value: 'uploadSpeed'
      },
      {
          label: 'price',
          value: 'price'
      },
  ];
  faChevronRight = faChevronRight;
  faLongArraowAltDown = faLongArrowAltDown;
  faLongArrowAltUp = faLongArrowAltUp;
  faChevronDown = faChevronDown;
  
  constructor(private tariffService: TariffService) {}

  sortTariffs(criteria: FilterCriteria) {
    this.tariffService.getTariffs().pipe(this.extendTariffs()).subscribe((data: Tariff[]) => {
      if (criteria === 'recommended') {
          this.tariffs = [...data];
      } else {
          this.tariffs = [...this.tariffService.sortTariffs(data, criteria)];
      }
    });
  }

  onToggleBenefits(tariff: ExtendedTariff) {
    const toggledTariff = tariff;
    if (toggledTariff.showMore) {
      toggledTariff.benefitsToDisplay = toggledTariff.benefits.length;
    } 
    
    if (toggledTariff.showLess) {
      toggledTariff.benefitsToDisplay = DEFAULT_NUMBER_OF_BENEFITS_TO_DISPLAY;
    }

    toggledTariff.showLess = !toggledTariff.showLess;
    toggledTariff.showMore = !toggledTariff.showMore;

    this.tariffs = this.tariffs.map((tariff) => {
      if(tariff.id === toggledTariff.id) {
        tariff = toggledTariff;
      }
      return tariff;
    });
  }

  extendTariffs() {
    return map((tariffs: Tariff[]) => {
      return tariffs.map((tariff) => ({
        ...tariff, showMore: true, showLess: false, benefitsToDisplay: DEFAULT_NUMBER_OF_BENEFITS_TO_DISPLAY
      }));
    });
  }

  fetchTariffs() {
    this.tariffService.getTariffs().pipe(this.extendTariffs())
    .subscribe((data: ExtendedTariff[]) => {
      this.tariffs = data;
    });
  }

  ngOnInit() {
    this.fetchTariffs();
  }
}
