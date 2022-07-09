import { Pipe, PipeTransform } from '@angular/core'
import { PercentPipe, DecimalPipe } from '@angular/common';

@Pipe({ name: 'foodAttribute' })
export class FoodAttributePipe implements PipeTransform {

  constructor(
    private _decimalPipe: DecimalPipe,
    private _percentPipe: PercentPipe
  ) {}

  transform(value: any, formatter: string): any {
    if (typeof value === 'string') {
      return value;
    }

    switch (formatter) {
      case 'percent':
        return this._percentPipe.transform(value, '1.0-2');
      case 'number':
        return this._decimalPipe.transform(value, '1.0-2');
    }
  }

}