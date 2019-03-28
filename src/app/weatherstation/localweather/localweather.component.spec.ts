import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalweatherComponent } from './localweather.component';

describe('LocalweatherComponent', () => {
  let component: LocalweatherComponent;
  let fixture: ComponentFixture<LocalweatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalweatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalweatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
