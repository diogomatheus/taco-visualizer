import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from 'src/app/pages/about/about.component';
import { ComparatorComponent } from 'src/app/pages/comparator/comparator.component';
import { BuilderComponent } from 'src/app/pages/builder/builder.component';
import { HomeComponent } from 'src/app/pages/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'comparator', component: ComparatorComponent },
  { path: 'builder', component: BuilderComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
