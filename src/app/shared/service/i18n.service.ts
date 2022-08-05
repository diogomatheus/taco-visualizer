import { LOCALE_ID, Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Xliff } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  i18nXliff: any = null;
    
  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private _httpClient: HttpClient
  ) {}

  get(key: string): string {
    const i18nNode: any = this.i18nXliff.i18nNodesByMsgId[key];
    return (i18nNode && i18nNode[0]) ? i18nNode[0].value : null;
  }

  loadI18nXliff(): Promise<any> {
    return new Promise((resolve, reject) => {
      const filename: string = `messages.${this.locale}.xlf`;
      this._httpClient
        .get(`assets/i18n/${filename}`, { responseType: 'text' })
        .subscribe((response: any) => {
            this.i18nXliff = new Xliff().load(response, '');
            resolve(true);
        });
    });
  }

}