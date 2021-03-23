import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PreviewiteneraryComponent } from './previewitenerary.component';

describe('PreviewiteneraryComponent', () => {
  let component: PreviewiteneraryComponent;
  let fixture: ComponentFixture<PreviewiteneraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewiteneraryComponent],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewiteneraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
