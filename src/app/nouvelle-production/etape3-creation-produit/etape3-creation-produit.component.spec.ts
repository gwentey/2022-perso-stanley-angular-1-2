import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Etape3CreationProduitComponent } from './etape3-creation-produit.component';

describe('Etape3CreationProduitComponent', () => {
  let component: Etape3CreationProduitComponent;
  let fixture: ComponentFixture<Etape3CreationProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Etape3CreationProduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Etape3CreationProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
