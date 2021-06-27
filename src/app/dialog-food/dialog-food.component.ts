import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Food } from './../shared/model/food';

@Component({
  selector: 'app-dialog-food',
  templateUrl: './dialog-food.component.html',
  styleUrls: ['./dialog-food.component.scss']
})
export class DialogFoodComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Food
  ) {}

  ngOnInit() {
  }

  isString(value) {
    return typeof value == "string";
  }

}
