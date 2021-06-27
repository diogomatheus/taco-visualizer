import { Injectable } from '@angular/core';

import { FoodCategory } from '../shared/model/food-category';
import { CATEGORIES } from '../shared/data/food-categories';

@Injectable({
  providedIn: 'root'
})
export class FoodCategoryService {
  constructor() { }

  getCategories(): FoodCategory[] {
    return CATEGORIES;
  }
}
