import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepodependenciesComponent } from './repodependencies.component';

describe('RepodependenciesComponent', () => {
  let component: RepodependenciesComponent;
  let fixture: ComponentFixture<RepodependenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepodependenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepodependenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
