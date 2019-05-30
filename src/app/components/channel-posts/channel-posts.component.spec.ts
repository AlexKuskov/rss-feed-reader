import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelPostsComponent } from './channel-posts.component';

describe('ChannelPostsComponent', () => {
  let component: ChannelPostsComponent;
  let fixture: ComponentFixture<ChannelPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
