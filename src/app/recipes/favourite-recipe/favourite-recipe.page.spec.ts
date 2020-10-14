import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavouriteRecipePage } from './favourite-recipe.page';

describe('FavouriteRecipePage', () => {
  let component: FavouriteRecipePage;
  let fixture: ComponentFixture<FavouriteRecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteRecipePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavouriteRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
