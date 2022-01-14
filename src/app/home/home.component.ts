import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Food } from './../shared/model/food';
import { FoodCategory } from '../shared/model/food-category';
import { FoodService } from '../services/food.service';
import { FoodCategoryService } from '../services/food-category.service';
import { DialogFoodComponent } from '../dialog-food/dialog-food.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  foods: Food[];
  categories: FoodCategory[];
  selectedCategory: String;
  dataSource: MatTableDataSource<Food>;
  displayedColumns: string[] = ['id', 'description', 'energy_kcal', 'lipid_g', 'protein_g', 'carbohydrate_g', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _foodCategoryService: FoodCategoryService,
    private _foodService: FoodService
  ) {}

  ngOnInit() {
    this.categories = this._foodCategoryService.getCategories();
    this.foods = this._foodService.getFoods();
    this.dataSource = new MatTableDataSource(this.foods);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onChangeCategory($event) {
    let foods = this.foods;
    if (this.selectedCategory) {
      foods = this.foods.filter((item) => item.category == this.selectedCategory);
    }

    this.dataSource.data = foods;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChangeDescriptionFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClickView(food) {
    this._dialog.open(
      DialogFoodComponent,
      {
        maxWidth: 'inherit',
        width: '80%',
        height: '90%',
        data: food
      }
    );
  }

  ngOnDestroy(): void {}

}
