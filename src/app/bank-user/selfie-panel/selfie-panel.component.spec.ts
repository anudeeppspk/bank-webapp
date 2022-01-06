import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfiePanelComponent } from './selfie-panel.component';

describe('SelfiePanelComponent', () => {
  let component: SelfiePanelComponent;
  let fixture: ComponentFixture<SelfiePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfiePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfiePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
