import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Etape6ProductionComponent } from './etape6-production.component';

describe('Etape6ProductionComponent', () => {
  let component: Etape6ProductionComponent;
  let fixture: ComponentFixture<Etape6ProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Etape6ProductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Etape6ProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
