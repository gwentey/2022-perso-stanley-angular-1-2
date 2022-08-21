import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Etape4CompositionComponent } from './etape4-composition.component';

describe('Etape4CompositionComponent', () => {
  let component: Etape4CompositionComponent;
  let fixture: ComponentFixture<Etape4CompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Etape4CompositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Etape4CompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
