import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartweatherComponent } from './chartweather.component';

describe('ChartweatherComponent', () => {
  let component: ChartweatherComponent;
  let fixture: ComponentFixture<ChartweatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartweatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartweatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
