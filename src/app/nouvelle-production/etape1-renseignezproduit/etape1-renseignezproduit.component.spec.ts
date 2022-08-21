import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Etape1RenseignezproduitComponent } from './etape1-renseignezproduit.component';

describe('Etape1RenseignezproduitComponent', () => {
  let component: Etape1RenseignezproduitComponent;
  let fixture: ComponentFixture<Etape1RenseignezproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Etape1RenseignezproduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Etape1RenseignezproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
