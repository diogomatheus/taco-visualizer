import { Component, OnInit, Inject, OnDestroy } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Food } from './../shared/model/food';

@Component({
  selector: 'app-dialog-food',
  templateUrl: './dialog-food.component.html',
  styleUrls: ['./dialog-food.component.scss']
})
export class DialogFoodComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(MAT_DIALOG_DATA) public row: Food
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {}

}
