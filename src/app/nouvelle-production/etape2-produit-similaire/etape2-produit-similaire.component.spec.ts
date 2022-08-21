import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Etape2ProduitSimilaireComponent } from './etape2-produit-similaire.component';

describe('Etape2ProduitSimilaireComponent', () => {
  let component: Etape2ProduitSimilaireComponent;
  let fixture: ComponentFixture<Etape2ProduitSimilaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Etape2ProduitSimilaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Etape2ProduitSimilaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
