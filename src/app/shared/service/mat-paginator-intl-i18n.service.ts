import { ClassProvider, Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

import { I18nService } from 'src/app/shared/service/i18n.service';

@Injectable({
  providedIn: "root"
})
export class MatPaginatorIntlI18n extends MatPaginatorIntl {

  constructor(
    private _i18nService: I18nService
  ) {
    super();
    this.itemsPerPageLabel = _i18nService.get("mat-paginator-intl-items-per-page");
    this.firstPageLabel = _i18nService.get("mat-paginator-intl-first-page");
    this.lastPageLabel = _i18nService.get("mat-paginator-intl-last-page");
    this.nextPageLabel = _i18nService.get("mat-paginator-intl-next-page");
    this.previousPageLabel = _i18nService.get("mat-paginator-intl-previous-page");
  }

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `${startIndex + 1} – ${endIndex} / ${length}`;
  };
  
}

export const MAT_PAGINATOR_INTL_SERVICE: ClassProvider = {
  provide: MatPaginatorIntl,
  useClass: MatPaginatorIntlI18n
};