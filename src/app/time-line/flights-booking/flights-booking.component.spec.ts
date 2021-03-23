import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlightsBookingComponent } from './flights-booking.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FlightsBookingComponent', () => {
  let component: FlightsBookingComponent;
  let fixture: ComponentFixture<FlightsBookingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FlightsBookingComponent],
        imports: [
          IonicModule.forRoot(),
          HttpClientTestingModule,
          RouterTestingModule,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(FlightsBookingComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
