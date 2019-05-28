import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelItemsComponent } from './channel-items.component';

describe('ChannelItemsComponent', () => {
  let component: ChannelItemsComponent;
  let fixture: ComponentFixture<ChannelItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
