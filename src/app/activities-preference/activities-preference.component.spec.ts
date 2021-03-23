import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActivitiesPreferenceComponent } from './activities-preference.component';

describe('ActivitiesPreferenceComponent', () => {
  let component: ActivitiesPreferenceComponent;
  let fixture: ComponentFixture<ActivitiesPreferenceComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ActivitiesPreferenceComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(ActivitiesPreferenceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
