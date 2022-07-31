import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Food } from 'src/app/shared/model/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  foods: Food[];

  constructor(private _httpClient: HttpClient) {}

  getFoods(): Food[] {
    return this.foods;
  }

  loadFoods(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get('assets/data/foods.json')
        .subscribe((response: any) => {
            this.foods = response;
            resolve(true);
        });
    });
  }
  
}
