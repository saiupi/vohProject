import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CanceltripComponent } from './canceltrip.component';

describe('CanceltripComponent', () => {
  let component: CanceltripComponent;
  let fixture: ComponentFixture<CanceltripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanceltripComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CanceltripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
