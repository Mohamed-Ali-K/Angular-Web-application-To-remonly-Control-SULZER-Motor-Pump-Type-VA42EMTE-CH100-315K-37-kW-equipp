import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagasinComponent } from './magasin.component';

describe('MagasinComponent', () => {
  let component: MagasinComponent;
  let fixture: ComponentFixture<MagasinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagasinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
