import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrienteeProfileComponent } from './orientee-profile.component';

describe('OrienteeProfileComponent', () => {
  let component: OrienteeProfileComponent;
  let fixture: ComponentFixture<OrienteeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrienteeProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrienteeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
