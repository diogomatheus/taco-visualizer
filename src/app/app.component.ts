import { Component } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { I18nService } from './services/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private _i18nService: I18nService,
    private _ngSelectConfig: NgSelectConfig
  ) {
    this._ngSelectConfig.notFoundText = this._i18nService.get('ng-select-not-found');
    this._ngSelectConfig.clearAllText = this._i18nService.get('ng-select-clear-all');
  }
  
}
