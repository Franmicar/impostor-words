import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Round } from './round';

describe('Round', () => {
  let component: Round;
  let fixture: ComponentFixture<Round>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Round]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Round);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
