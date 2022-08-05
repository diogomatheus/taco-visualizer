import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FoodAttributeGroupService } from 'src/app/shared/service/food-attribute-group.service';
import { FoodAttributeGroup } from 'src/app/shared/model/food-attribute-group';
import { Food } from 'src/app/shared/model/food';

@Component({
  selector: 'app-food-dialog',
  templateUrl: './food-dialog.component.html',
  styleUrls: ['./food-dialog.component.scss']
})
export class FoodDialogComponent implements OnInit, OnDestroy {

  attributeGroups: FoodAttributeGroup[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public row: Food,
    private _foodAttributeGroupService: FoodAttributeGroupService
  ) {}

  ngOnInit(): void {
    this.attributeGroups = this._foodAttributeGroupService
      .getFoodAttributeGroups()
      .map(item => ({...item}));
  }

  ngOnDestroy(): void {}

}
