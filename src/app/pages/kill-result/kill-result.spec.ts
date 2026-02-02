import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KillResult } from './kill-result';

describe('KillResult', () => {
  let component: KillResult;
  let fixture: ComponentFixture<KillResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KillResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KillResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
