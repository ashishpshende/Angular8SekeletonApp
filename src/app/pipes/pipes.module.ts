import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PhonePipe } from './phone.pipe';
import { LocaleDatePipe } from './locale-date.pipe';

@NgModule({
  declarations: [
    PhonePipe,
    LocaleDatePipe
  ],
  imports: [
  ],
  providers: [],
  exports: [
    PhonePipe,
    LocaleDatePipe
  ]
})
export class PipesModule { }
