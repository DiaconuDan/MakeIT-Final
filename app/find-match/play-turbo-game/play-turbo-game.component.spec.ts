import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayTurboGameComponent } from './play-turbo-game.component';

describe('PlayTurboGameComponent', () => {
  let component: PlayTurboGameComponent;
  let fixture: ComponentFixture<PlayTurboGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayTurboGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayTurboGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
