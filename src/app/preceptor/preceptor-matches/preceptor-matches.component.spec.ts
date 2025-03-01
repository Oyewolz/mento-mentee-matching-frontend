import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreceptorMatchesComponent } from './preceptor-matches.component';

describe('PreceptorMatchesComponent', () => {
  let component: PreceptorMatchesComponent;
  let fixture: ComponentFixture<PreceptorMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreceptorMatchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreceptorMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
