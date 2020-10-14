import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailRecipePage } from './detail-recipe.page';

describe('DetailRecipePage', () => {
  let component: DetailRecipePage;
  let fixture: ComponentFixture<DetailRecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRecipePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
