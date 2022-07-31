import { Pipe, PipeTransform } from '@angular/core';

import { I18nService } from 'src/app/shared/service/i18n.service';

@Pipe({ name: 'i18n' })
export class I18nPipe implements PipeTransform {

  constructor(
    private _i18nService: I18nService
  ) {}

  transform(value: any, id: string): any {
    let translation = this._i18nService.get(id ? id : value);
    return translation ? translation : value;
  }

}