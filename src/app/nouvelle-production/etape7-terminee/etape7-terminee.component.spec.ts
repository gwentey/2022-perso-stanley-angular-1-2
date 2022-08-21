import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Etape7TermineeComponent } from './etape7-terminee.component';

describe('Etape7TermineeComponent', () => {
  let component: Etape7TermineeComponent;
  let fixture: ComponentFixture<Etape7TermineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Etape7TermineeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Etape7TermineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
