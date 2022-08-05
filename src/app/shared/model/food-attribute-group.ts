import { FoodAttribute } from 'src/app/shared/model/food-attribute';

export interface FoodAttributeGroup {

  'name': string;
  'label': string;
  'attributes': FoodAttribute[];

}