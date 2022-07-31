import { NgModule } from '@angular/core';
import { AppBootstrapModule } from 'src/app/app-bootstrap.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DecimalPipe, PercentPipe } from '@angular/common';

import { AppComponent } from 'src/app/app.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ComparatorComponent } from 'src/app/pages/comparator/comparator.component';
import { BuilderComponent } from 'src/app/pages/builder/builder.component';
import { AboutComponent } from 'src/app/pages/about/about.component';
import { FoodDialogComponent } from 'src/app/components/food-dialog/food-dialog.component';
import { FoodListComponent } from 'src/app/components/food-list/food-list.component';
import { I18nService } from 'src/app/shared/service/i18n.service';
import { FoodService } from 'src/app/shared/service/food.service';
import { FoodCategoryService } from 'src/app/shared/service/food-category.service';
import { FoodAttributeGroupService } from 'src/app/shared/service/food-attribute-group.service';
import { FoodAttributePipe } from 'src/app/shared/pipe/food-attribute-pipe';
import { I18nPipe } from 'src/app/shared/pipe/i18n-pipe';

import { MAT_PAGINATOR_INTL_SERVICE } from 'src/app/shared/service/mat-paginator-intl-i18n.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ComparatorComponent,
    BuilderComponent,
    AboutComponent,
    FoodDialogComponent,
    FoodListComponent,
    FoodAttributePipe,
    I18nPipe
  ],
  entryComponents: [
    FoodDialogComponent
  ],
  imports: [
    AppBootstrapModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatDividerModule,
    MatStepperModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    NgSelectModule,
    MatButtonModule,
    MatButtonToggleModule,   
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatListModule,
    MatExpansionModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [
    Title,
    I18nService,
    FoodService,
    FoodCategoryService,
    FoodAttributeGroupService,
    FoodAttributePipe,
    I18nPipe,
    PercentPipe,
    DecimalPipe,
    MAT_PAGINATOR_INTL_SERVICE
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
