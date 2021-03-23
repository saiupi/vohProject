import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SelectActivitiesPreferenceComponent } from './select-activities-preference.component';

describe('SelectActivitiesPreferenceComponent', () => {
  let component: SelectActivitiesPreferenceComponent;
  let fixture: ComponentFixture<SelectActivitiesPreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectActivitiesPreferenceComponent],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectActivitiesPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
