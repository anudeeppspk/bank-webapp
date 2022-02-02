import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDeclineCellComponent } from './approve-decline-cell.component';

describe('ApproveDeclineCellComponent', () => {
  let component: ApproveDeclineCellComponent;
  let fixture: ComponentFixture<ApproveDeclineCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDeclineCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDeclineCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
