import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
export class HomeComponent implements OnInit {

  foods: Food[];
  categories: FoodCategory[];
  selectedCategory: String;

  displayedColumns: string[] = ['id', 'description', 'energy_kcal', 'lipid_g', 'protein_g', 'carbohydrate_g', 'actions'];
  dataSource: MatTableDataSource<Food>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private foodService: FoodService,
    private foodCategoryService: FoodCategoryService) {
    this.categories = foodCategoryService.getCategories();
    this.foods = foodService.getFoods();
    this.dataSource = new MatTableDataSource(this.foods);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  selectCategory() {
    let foods = this.foods;
    if (this.selectedCategory)
      foods = foods.filter((item) => item.category == this.selectedCategory);

    this.dataSource.data = foods;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterData(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isString(value) {
    return typeof value == "string";
  }

  onView(food) {
    const dialogRef = this.dialog.open(DialogFoodComponent, {
      width: '80%',
      height: '80%',
      data: food
    });
  }

}
