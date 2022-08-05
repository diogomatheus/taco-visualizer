import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, BreakpointState  } from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';

import { I18nService } from 'src/app/shared/service/i18n.service';
import { Food } from 'src/app/shared/model/food';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit, OnDestroy {

  isLayoutDesktopMode: boolean;

  foodList: Food[];
  selectedMealTime: string;
  selectedMealType: string;
  selectedWeekdays: string[];
  selectedCompositionType: string = 'calculated';
  mealDescription: string;
  mealObservation: string;

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _titleService: Title,
    private _i18nService: I18nService,
    private _snackBar: MatSnackBar
  ) {
    this._breakpointObserver
      .observe(["(max-width: 992px)"])
      .subscribe((result: BreakpointState) => {
        this.isLayoutDesktopMode = result.matches;
      });
  }

  ngOnInit(): void {
    this._titleService.setTitle(this._i18nService.get('page-title-builder'));
    this.foodList = [];
  }

  firstStepButtonHandler(stepper: MatStepper): void {
    if (this.isFirstStepValid()) {
      stepper.next();
    } else {
      const icon: string = '⚠️';
      const message: string = this._i18nService.get("meal-builder-first-validation-message");
      this._snackBar.open(`${icon} ${message}`, '', { duration: 3500 });
    }
  }

  isFirstStepValid(): boolean {
    return (this.selectedMealTime && this.selectedMealTime.trim())
      && (this.selectedMealType && this.selectedMealType.trim())
      && (Array.isArray(this.selectedWeekdays) && this.selectedWeekdays.length > 0);
  }

  secondStepButtonHandler(stepper: MatStepper): void {
    if (this.isSecondStepValid()) {
      stepper.next();
    } else {
      const icon: string = '⚠️';
      const message: string = this._i18nService.get("meal-builder-second-validation-message");
      this._snackBar.open(`${icon} ${message}`, '', { duration: 3500 });
    }
  }

  isSecondStepValid(): any {
    if (this.selectedCompositionType === 'calculated') {
      return (Array.isArray(this.foodList) && this.foodList.length > 0);
    } else {
      return (this.mealDescription && this.mealDescription.trim());
    }
  }

  lastStepButtonHandler(): void {
    window.print();
  }

  ngOnDestroy(): void {}

}
