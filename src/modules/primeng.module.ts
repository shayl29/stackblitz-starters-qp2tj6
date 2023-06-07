import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  exports: [ButtonModule, AutoCompleteModule],
})
export class PrimeNGModule {}
