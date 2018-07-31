import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindMatchComponent } from './find-match.component';

describe('FindMatchComponent', () => {
  let component: FindMatchComponent;
  let fixture: ComponentFixture<FindMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
