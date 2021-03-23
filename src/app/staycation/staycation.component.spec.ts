import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StaycationComponent } from './staycation.component';

describe('StaycationComponent', () => {
  let component: StaycationComponent;
  let fixture: ComponentFixture<StaycationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaycationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StaycationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
