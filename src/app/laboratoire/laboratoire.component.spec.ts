import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoireComponent } from './laboratoire.component';

describe('LaboratoireComponent', () => {
  let component: LaboratoireComponent;
  let fixture: ComponentFixture<LaboratoireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
