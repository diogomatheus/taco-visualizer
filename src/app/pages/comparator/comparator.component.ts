import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FoodAttributeGroupService } from 'src/app/shared/service/food-attribute-group.service';
import { I18nService } from 'src/app/shared/service/i18n.service';
import { FoodAttributeGroup } from 'src/app/shared/model/food-attribute-group';
import { Food } from 'src/app/shared/model/food';

@Component({
  selector: 'app-comparator',
  templateUrl: './comparator.component.html',
  styleUrls: ['./comparator.component.scss']
})
export class ComparatorComponent implements OnInit, OnDestroy {

  foodList: Food[];
  foodAttributeGroups: FoodAttributeGroup[];
  foodComparisonCriteria: Object;

  constructor(
    private _titleService: Title,
    private _i18nService: I18nService,
    private _foodAttributeGroupService: FoodAttributeGroupService,
    private _elementRef: ElementRef,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle(this._i18nService.get('page-title-comparator'));
    this.foodList = [];
    this.foodAttributeGroups = this._foodAttributeGroupService
      .getFoodAttributeGroups()
      .map(item => ({...item} as FoodAttributeGroup));
    this._buildFoodComparisonCriteria(this.foodAttributeGroups);
  }

  onChangeCriteriaHandler(event): void {
    const criteriaType: string = event.source._elementRef.nativeElement.dataset.criteriaType;
    if (typeof criteriaType !== 'string')
      return;

    switch (criteriaType) {
      case 'group':
        this._onChangeCriteriaGroupHandler(event);
        break;
      case 'item':
        this._onChangeCriteriaItemHandler(event);
        break;
    }
  }

  firstStepButtonHandler(stepper: MatStepper): void {
    if (this.isFirstStepValid()) {
      stepper.next();
    } else {
      const icon: string = '⚠️';
      const message: string = this._i18nService.get("food-comparator-first-validation-message");
      this._snackBar.open(`${icon} ${message}`, '', { duration: 3500 });
    }
  }

  isFirstStepValid(): boolean {
    return this._isFoodSelectionValid() && this._isCriteriaSelectionValid();
  }

  ngOnDestroy(): void {}

  private _buildFoodComparisonCriteria(foodAttributeGroups: FoodAttributeGroup[]): void {
    this.foodComparisonCriteria = new Object();
    for(const foodAttributeGroup of foodAttributeGroups) {
      const groupKey = `${foodAttributeGroup.name}_group`;
      this.foodComparisonCriteria[groupKey] = true;
      for(const foodAttribute of foodAttributeGroup.attributes) {
        this.foodComparisonCriteria[foodAttribute.name] = true;
      }
    }
  }

  private _onChangeCriteriaGroupHandler(event): void {
    const groupName: string = event.source._elementRef.nativeElement.dataset.name;
    this.foodComparisonCriteria[groupName] = event.checked;

    const DOM: HTMLElement = this._elementRef.nativeElement;
    const groupElements: NodeListOf<Element> = DOM.querySelectorAll(`[data-criteria-group=${groupName}]`);
    groupElements.forEach(element => {
      const attributeName: string = element.getAttribute('data-name');
      this.foodComparisonCriteria[attributeName] = event.checked;
    });
  }

  private _onChangeCriteriaItemHandler(event): void {
    const attributeName: string = event.source._elementRef.nativeElement.dataset.name;
    this.foodComparisonCriteria[attributeName] = event.checked;

    const groupName: string = event.source._elementRef.nativeElement.dataset.criteriaGroup;
    if (
      (event.checked && this.foodComparisonCriteria[groupName] !== event.checked) ||
      (!event.checked && this._isAllCriteriaGroupItemsUnchecked(groupName))
    ) {
      this.foodComparisonCriteria[groupName] = event.checked;
    }
  }

  private _isAllCriteriaGroupItemsUnchecked(groupName: string): boolean {
    let validation: boolean = true;

    const DOM: HTMLElement = this._elementRef.nativeElement;
    const groupElements: NodeListOf<Element> = DOM.querySelectorAll(`[data-criteria-group=${groupName}]`);
    groupElements.forEach(element => {
      const attributeName: string = element.getAttribute('data-name');
      if (this.foodComparisonCriteria[attributeName] === true) {
        validation = false;
      }
    });
    
    return validation;
  }

  private _isFoodSelectionValid(): boolean {
    return Array.isArray(this.foodList) && this.foodList.length >= 2;
  }

  private _isCriteriaSelectionValid(): boolean {
    const criteria: string[] = Object.getOwnPropertyNames(this.foodComparisonCriteria);
    const selectedCriteria: string[] = criteria.filter(item => this.foodComparisonCriteria[item]);
    return Array.isArray(selectedCriteria) && selectedCriteria.length >= 2;
  }

}
