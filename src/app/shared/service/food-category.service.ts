import { Injectable } from '@angular/core';

import { FoodService } from 'src/app/shared/service/food.service';

@Injectable({
  providedIn: 'root'
})
export class FoodCategoryService {

  constructor(private _foodService: FoodService) {}

  getCategories(): string[] {
    return [...new Set(this._foodService.getFoods().map(food => food.category))];
  }

}
