import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Virtual360Component } from './virtual360.component';

describe('Virtual360Component', () => {
  let component: Virtual360Component;
  let fixture: ComponentFixture<Virtual360Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Virtual360Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Virtual360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
