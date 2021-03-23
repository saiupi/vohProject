import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntercodeComponent } from './entercode.component';

describe('EntercodeComponent', () => {
  let component: EntercodeComponent;
  let fixture: ComponentFixture<EntercodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntercodeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntercodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
