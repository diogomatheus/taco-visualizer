import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { I18nService } from '../services/i18n.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  constructor(
    private _titleService: Title,
    private _i18nService: I18nService
  ) {}

  ngOnInit() {
    this._titleService.setTitle(this._i18nService.get('page-title-about'));
  }

  ngOnDestroy(): void {}

}
