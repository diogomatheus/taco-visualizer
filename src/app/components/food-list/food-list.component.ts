import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';

import { FoodService } from 'src/app/shared/service/food.service';
import { Food } from 'src/app/shared/model/food';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit, OnDestroy {

  @Input() selectable: boolean;
  @Input() quantifiable: boolean;

  @Input() selectedFoods: Food[];
  @Output() selectedFoodsChange = new EventEmitter<Food[]>();

  foods: Food[] = [];
  selectedFoodId: number;
  tableColumns: string[];

  constructor(private _foodService: FoodService) {}

  ngOnInit() {
    const originalFoods = this._foodService.getFoods();
    originalFoods.forEach(element => this.foods.push(Object.assign({}, element)));
    this.selectedFoods = (this.selectedFoods === null || typeof this.selectedFoods === 'undefined') ? [] : this.selectedFoods;
    this.tableColumns = this.getTableColumns();
  }

  addFood(foodListNgSelect: NgSelectComponent) {
    if (this.selectedFoodId) {
      const foodIndex = this.foods.findIndex(element => element.id === this.selectedFoodId);
      if (foodIndex !== -1 && this.foods[foodIndex] !== undefined) {
        this.foods[foodIndex].disabled = true;
        this.selectedFoods = this.selectedFoods.concat([this.foods[foodIndex]]);
        this.selectedFoodsChange.emit(this.selectedFoods);

        foodListNgSelect.handleClearClick();
      }
    }
  }

  removeFood(food: Food) {
    this.selectedFoods = this.selectedFoods.filter(element => element.id !== food.id);
    this.selectedFoodsChange.emit(this.selectedFoods);

    const foodIndex = this.foods.findIndex(element => element.id === food.id);
    if (foodIndex !== -1) {
      food.disabled = false;
      this.foods[foodIndex] = food;
    }
  }

  getTableColumns() {
    let columns = ['id', 'description'];
    if (this.selectable) columns.splice(2, 0, 'actions');
    if (this.quantifiable) columns.splice(2, 0, 'measure', 'unit');
    return columns;
  } 

  ngOnDestroy(): void {}

}
