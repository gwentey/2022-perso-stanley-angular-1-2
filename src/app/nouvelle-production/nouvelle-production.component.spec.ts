import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleProductionComponent } from './nouvelle-production.component';

describe('NouvelleProductionComponent', () => {
  let component: NouvelleProductionComponent;
  let fixture: ComponentFixture<NouvelleProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouvelleProductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouvelleProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
