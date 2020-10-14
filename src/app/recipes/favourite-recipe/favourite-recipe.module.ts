import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouriteRecipePageRoutingModule } from './favourite-recipe-routing.module';

import { FavouriteRecipePage } from './favourite-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouriteRecipePageRoutingModule
  ],
  declarations: [FavouriteRecipePage]
})
export class FavouriteRecipePageModule {}
