import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreceptorDashboardComponent } from './preceptor-dashboard.component';

describe('PreceptorDashboardComponent', () => {
  let component: PreceptorDashboardComponent;
  let fixture: ComponentFixture<PreceptorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreceptorDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreceptorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
