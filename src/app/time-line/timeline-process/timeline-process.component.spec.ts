import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { TimelineProcessComponent } from './timeline-process.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TimelineProcessComponent', () => {
  let component: TimelineProcessComponent;
  let fixture: ComponentFixture<TimelineProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimelineProcessComponent],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TimelineProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
