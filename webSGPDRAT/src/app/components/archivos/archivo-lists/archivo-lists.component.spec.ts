import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivoListsComponent } from './archivo-lists.component';

describe('ArchivoListsComponent', () => {
  let component: ArchivoListsComponent;
  let fixture: ComponentFixture<ArchivoListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivoListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivoListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
