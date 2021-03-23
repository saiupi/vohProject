import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { StaysComponent } from './stays.component';

describe('StaysComponent', () => {
  let component: StaysComponent;
  let fixture: ComponentFixture<StaysComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StaysComponent],
        imports: [
          IonicModule.forRoot(),
          HttpClientTestingModule,
          RouterModule.forRoot([]),
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(StaysComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
