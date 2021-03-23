import { RouterModule } from '@angular/router';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { SharenavComponent } from './sharenav.component';

describe('SharenavComponent', () => {
  let component: SharenavComponent;
  let fixture: ComponentFixture<SharenavComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SharenavComponent],
        imports: [
          HttpClientTestingModule,
          IonicModule.forRoot(),
          RouterModule.forRoot([]),
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(SharenavComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
