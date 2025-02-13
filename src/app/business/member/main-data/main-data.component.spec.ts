import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDataComponent } from './main-data.component';

describe('MainDataComponent', () => {
  let component: MainDataComponent;
  let fixture: ComponentFixture<MainDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
