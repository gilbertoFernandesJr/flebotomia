import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlebotomiaComponent } from './flebotomia.component';

describe('FlebotomiaComponent', () => {
  let component: FlebotomiaComponent;
  let fixture: ComponentFixture<FlebotomiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlebotomiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlebotomiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
