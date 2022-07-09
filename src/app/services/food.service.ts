import { Injectable } from '@angular/core';

import { Food } from './../shared/model/food';
import { FOODS } from '../shared/data/foods';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() {}

  getFoods(): Food[] {
    return FOODS;
  }
  
}
