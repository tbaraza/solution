import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TariffListComponent } from './tariff-list/tariff-list.component';
import { TariffDetailsComponent } from './tariff-details/tariff-details.component';

const routes: Routes = [
  { path: '', component: TariffListComponent },
  { path: 'tariffs/:tariffId', component: TariffDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
