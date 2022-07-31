import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FoodAttributeGroup } from 'src/app/shared/model/food-attribute-group';

@Injectable({
  providedIn: 'root'
})
export class FoodAttributeGroupService {

  foodAttributeGroups: FoodAttributeGroup[];

  constructor(private _httpClient: HttpClient) {}

  getFoodAttributeGroups(): FoodAttributeGroup[] {
    return this.foodAttributeGroups;
  }

  loadFoodAttributeGroups(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get('assets/data/food-attribute-groups.json')
        .subscribe((response: any) => {
            this.foodAttributeGroups = response;
            resolve(true);
        });
    });
  }

}
