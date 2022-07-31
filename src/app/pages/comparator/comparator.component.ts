import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FoodAttributeGroupService } from 'src/app/shared/service/food-attribute-group.service';
import { I18nService } from 'src/app/shared/service/i18n.service';
import { FoodComparisonCriteria } from 'src/app/shared/model/food-comparison-criteria';
import { FoodAttributeGroup } from 'src/app/shared/model/food-attribute-group';
import { Food } from 'src/app/shared/model/food';

@Component({
  selector: 'app-comparator',
  templateUrl: './comparator.component.html',
  styleUrls: ['./comparator.component.scss']
})
export class ComparatorComponent implements OnInit, OnDestroy {

  foodList: Food[];
  foodComparisonCriteria: FoodComparisonCriteria;
  attributeGroups: FoodAttributeGroup[];

  constructor(
    private _titleService: Title,
    private _i18nService: I18nService,
    private _foodAttributeGroupService: FoodAttributeGroupService,
    private _elementRef: ElementRef,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._titleService.setTitle(this._i18nService.get('page-title-comparator'));

    this.foodList = [];
    this.foodComparisonCriteria = new FoodComparisonCriteria();
    this.attributeGroups = this._foodAttributeGroupService.getFoodAttributeGroups();
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

  firstStepButtonHandler(stepper: MatStepper) {
    if (this.isFirstStepValid()) {
      stepper.next();
    } else {
      const icon = '⚠️';
      const message = this._i18nService.get("food-comparator-first-validation-message");
      this._snackBar.open(`${icon} ${message}`, '', { duration: 3500 });
    }
  }

  isFirstStepValid() {
    const foodSelectionValidation = this._isFoodSelectionValid();
    const criteriaSelectionValidation = this._isCriteriaSelectionValid();
    return foodSelectionValidation && criteriaSelectionValidation;
  }

  _isFoodSelectionValid() {
    return Array.isArray(this.foodList) && this.foodList.length >= 2;
  }

  _isCriteriaSelectionValid() {
    const selectedCriteria = Object.keys(this.foodComparisonCriteria).filter(attribute => this.foodComparisonCriteria[attribute]);
    return Array.isArray(selectedCriteria) && selectedCriteria.length >= 2;
  }

  ngOnDestroy(): void {}

}
