import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavouriteRecipePage } from './favourite-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: FavouriteRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavouriteRecipePageRoutingModule {}
