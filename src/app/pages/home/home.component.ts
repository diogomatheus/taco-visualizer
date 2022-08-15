import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { FoodDialogComponent } from 'src/app/components/food-dialog/food-dialog.component';
import { FoodCategoryService } from 'src/app/shared/service/food-category.service';
import { FoodService } from 'src/app/shared/service/food.service';
import { I18nService } from 'src/app/shared/service/i18n.service';
import { Food } from 'src/app/shared/model/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  categories: string[];
  selectedCategory: string;
  foods: Food[];
  dataSource: MatTableDataSource<Food>;
  displayedColumns: string[] = ['id', 'description', 'energy_kcal', 'lipid_g', 'protein_g', 'carbohydrate_g', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _titleService: Title,
    private _dialog: MatDialog,
    private _i18nService: I18nService,
    private _foodCategoryService: FoodCategoryService,
    private _foodService: FoodService
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle(this._i18nService.get('page-title-home'));
    this.categories = this._foodCategoryService.getCategories();
    this.foods = this._foodService
      .getFoods()
      .map(item => ({...item} as Food));

    this.dataSource = new MatTableDataSource(this.foods);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: Food, filter: string) => {
      const source: string = data.description.trim().toLowerCase();
      return source.indexOf(filter.trim().toLowerCase()) !== -1;
    };
  }

  onChangeCategoryHandler(value: string): void {
    this.dataSource.data = value ? this.foods.filter((item) => item.category == value) : this.foods;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  onChangeDescriptionHandler(value: string): void {
    this.dataSource.filter = value;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  viewButtonHandler(food: Food): void {
    this._dialog.open(
      FoodDialogComponent,
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
