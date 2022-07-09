import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFoodComponent } from './dialog-food.component';

describe('DialogFoodComponent', () => {
  
  let component: DialogFoodComponent;
  let fixture: ComponentFixture<DialogFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
