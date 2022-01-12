import { LOCALE_ID, Injectable, Inject } from "@angular/core";
import { Xliff } from '@angular/compiler';

declare const require;

@Injectable({
  providedIn: 'root'
})
export class I18nService {
    
  constructor(
    @Inject(LOCALE_ID) public locale: string
  ) {}

  get(key: string): string {
    const content = require(`raw-loader!../../i18n/messages.${this.locale.substr(0, 2)}.xlf`).default;
    const xliff: any = new Xliff().load(content, '');
    return xliff.i18nNodesByMsgId[key][0].value;
  }

}
