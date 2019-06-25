import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObenComponent } from './oben.component';

describe('ObenComponent', () => {
  let component: ObenComponent;
  let fixture: ComponentFixture<ObenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
