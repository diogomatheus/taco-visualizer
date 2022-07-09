import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';

import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { Food } from '../shared/model/food';
import { FoodComparisonCriteria } from '../shared/model/food-comparison-criteria';
import { FoodService } from '../services/food.service';
import { I18nService } from '../services/i18n.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-comparator',
  templateUrl: './comparator.component.html',
  styleUrls: ['./comparator.component.scss']
})
export class ComparatorComponent implements OnInit, OnDestroy {

  foods: Food[];
  foodComparisonCriteria: FoodComparisonCriteria;
  selectedFood: String;
  selectedFoods: Food[];
  dataSource: MatTableDataSource<Food>;
  displayedColumns: string[] = ['id', 'description', 'actions'];

  constructor(
    private _titleService: Title,
    private _i18nService: I18nService,
    private _foodService: FoodService,
    private _snackBar: MatSnackBar,
    private _elementRef: ElementRef
  ) {}

  ngOnInit() {
    this._titleService.setTitle(this._i18nService.get('page-title-comparator'));

    this.foods = [];
    let originalFoods = this._foodService.getFoods();
    originalFoods.forEach(food => this.foods.push(Object.assign({}, food)));

    this.selectedFoods = [];
    this.dataSource = new MatTableDataSource(this.selectedFoods);

    this.foodComparisonCriteria = new FoodComparisonCriteria();
  }

  onChangeCriteria(event) {
    const criteriaType = event.source._elementRef.nativeElement.dataset.criteriaType;
    if (typeof criteriaType !== 'string') return;
    switch (criteriaType) {
      case 'group':
        this._onChangeCriteriaGroup(event);
        break;
      case 'item':
        this._onChangeCriteriaItem(event);
        break;
    }
  }

  _onChangeCriteriaGroup(event) {
    const DOM: HTMLElement = this._elementRef.nativeElement;
    const groupItems = DOM.querySelectorAll(`[data-criteria-group=${event.source.name}]`);
    if (groupItems) {
      groupItems.forEach(item => {
        const attributeName = item.getAttribute('name');
        if (this.foodComparisonCriteria[attributeName] !== event.checked) {
          this.foodComparisonCriteria[attributeName] = event.checked;
        }
      });
    }
  }

  _onChangeCriteriaItem(event) {
    const sourceGroup = event.source._elementRef.nativeElement.dataset.criteriaGroup;
    const DOM: HTMLElement = this._elementRef.nativeElement;
    const group = DOM.querySelector(`[name=${sourceGroup}]`);
    if (group) {
      const attributeName = group.getAttribute('name');
      if (
        (event.checked && this.foodComparisonCriteria[attributeName] !== event.checked) ||
        (!event.checked && this._isAllCriteriaGroupItemsUnchecked(sourceGroup))
      ) {
        this.foodComparisonCriteria[attributeName] = event.checked;
      }
    }
  }

  _isAllCriteriaGroupItemsUnchecked(group: string) {
    let validation = true;

    const DOM: HTMLElement = this._elementRef.nativeElement;
    const groupItems = DOM.querySelectorAll(`[data-criteria-group=${group}]`);
    if (groupItems) {
      groupItems.forEach(item => {
        const attributeName = item.getAttribute('name');
        if (this.foodComparisonCriteria[attributeName] === true) {
          validation = false;
        }
      });
    }

    return validation;
  }

  buildComparison(stepper: MatStepper) {
    if (this.isBuildRequirementsValid()) {
      stepper.next();
    } else {
      const icon = '⚠️';
      const message = this._i18nService.get("food-comparator-validation-message");
      this._snackBar.open(`${icon} ${message}`, '', { duration: 3500 });
    }
  }

  isBuildRequirementsValid() {
    const foodSelectionValidation = this._isFoodSelectionValid();
    const criteriaSelectionValidation = this._isCriteriaSelectionValid();
    return foodSelectionValidation && criteriaSelectionValidation;
  }

  _isFoodSelectionValid() {
    return Array.isArray(this.selectedFoods) && this.selectedFoods.length >= 2;
  }

  _isCriteriaSelectionValid() {
    const selectedCriteria = Object.keys(this.foodComparisonCriteria).filter(attribute => this.foodComparisonCriteria[attribute]);
    return Array.isArray(selectedCriteria) && selectedCriteria.length >= 2;
  }

  addFood(foodSelectionDropdown: NgSelectComponent) {
    if (this.selectedFood) {
      const foodIndex = this.foods.findIndex(element => element.description === this.selectedFood);
      if (foodIndex !== -1) {
        let food = this.foods[foodIndex];
        this.selectedFoods.push(food);
        this.dataSource.data = this.selectedFoods;
        foodSelectionDropdown.handleClearClick();
        food.disabled = true;
        this.foods[foodIndex] = food;
      }
    }
  }

  deleteFood(food: Food) {
    this.selectedFoods = this.selectedFoods.filter(element => element.description !== food.description);
    this.dataSource.data = this.selectedFoods;

    const foodIndex = this.foods.findIndex(element => element.description === food.description);
    if (foodIndex !== -1) {
      food.disabled = false;
      this.foods[foodIndex] = food;
    }
  }

  ngOnDestroy(): void {}

}
