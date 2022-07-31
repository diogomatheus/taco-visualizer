import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { I18nService } from 'src/app/shared/service/i18n.service';
import { FoodService } from 'src/app/shared/service/food.service';
import { FoodAttributeGroupService } from 'src/app/shared/service/food-attribute-group.service';

export function bootstrap(
  _i18nService: I18nService,
  _foodService: FoodService,
  _foodAttributeGroupService: FoodAttributeGroupService
) {
  return () => Promise.all([
    _i18nService.loadI18nXliff(),
    _foodService.loadFoods(),
    _foodAttributeGroupService.loadFoodAttributeGroups()
  ]);
}

@NgModule({
  imports: [ HttpClientModule ],
  providers: [
    I18nService,
    {
      provide: APP_INITIALIZER,
      useFactory: bootstrap,
      deps: [I18nService, FoodService, FoodAttributeGroupService],
      multi: true
    }
  ]
})
export class AppBootstrapModule { }