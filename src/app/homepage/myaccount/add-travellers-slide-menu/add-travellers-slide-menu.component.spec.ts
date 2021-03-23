import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTravellersSlideMenuComponent } from './add-travellers-slide-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddTravellersSlideMenuComponent', () => {
  let component: AddTravellersSlideMenuComponent;
  let fixture: ComponentFixture<AddTravellersSlideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTravellersSlideMenuComponent],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTravellersSlideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
