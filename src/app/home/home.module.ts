import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [HomeComponent, SearchComponent],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
