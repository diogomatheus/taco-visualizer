import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DialogFoodComponent } from './dialog-food/dialog-food.component';
import { ComparatorComponent } from './comparator/comparator.component';
import { AboutComponent } from './about/about.component';

import { FoodCategoryService } from './services/food-category.service';
import { FoodService } from './services/food.service';
import { FoodAttributePipe } from './shared/pipe/food-attribute-pipe';
import { DecimalPipe, PercentPipe } from '@angular/common';

import { MAT_PAGINATOR_INTL_SERVICE } from "./services/mat-paginator-intl-i18n.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogFoodComponent,
    ComparatorComponent,
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
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    NgSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatStepperModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [
    Title,
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
