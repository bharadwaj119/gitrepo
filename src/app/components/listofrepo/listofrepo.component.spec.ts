import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofrepoComponent } from './listofrepo.component';

describe('ListofrepoComponent', () => {
  let component: ListofrepoComponent;
  let fixture: ComponentFixture<ListofrepoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListofrepoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofrepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
