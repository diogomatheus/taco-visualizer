import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DecimalPipe, PercentPipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './home/home.component';
import { DialogFoodComponent } from './dialog-food/dialog-food.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { AboutComponent } from './about/about.component';

import { FoodCategoryService } from './services/food-category.service';
import { FoodService } from './services/food.service';
import { FoodAttributePipe } from './shared/pipe/food-attribute-pipe';

import { MAT_PAGINATOR_INTL_SERVICE } from "./services/mat-paginator-intl-i18n.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogFoodComponent,
    ComparisonComponent,
    AboutComponent,
    FoodAttributePipe
  ],
  entryComponents: [
    DialogFoodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatDialogModule,
    MatTabsModule,
    MatStepperModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatGridListModule,
    MatSnackBarModule,
    MatCardModule
  ],
  providers: [
    FoodCategoryService,
    FoodService,
    FoodAttributePipe,
    PercentPipe,
    DecimalPipe,
    MAT_PAGINATOR_INTL_SERVICE
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
