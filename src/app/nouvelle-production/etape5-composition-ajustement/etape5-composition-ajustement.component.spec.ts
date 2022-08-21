import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Etape5CompositionAjustementComponent } from './etape5-composition-ajustement.component';

describe('Etape5CompositionAjustementComponent', () => {
  let component: Etape5CompositionAjustementComponent;
  let fixture: ComponentFixture<Etape5CompositionAjustementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Etape5CompositionAjustementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Etape5CompositionAjustementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
