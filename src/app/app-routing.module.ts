import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    children: [
      {
        path:'',
        loadChildren: () => import('./recipes/recipes.module').then( m => m.RecipesPageModule)
      },
      {
        path:'add-recipe',
        loadChildren: () => import('./recipes/add-recipe/add-recipe.module').then( m => m.AddRecipePageModule)
      },
      {
        path: 'favourite',
        loadChildren: () => import('./recipes/favourite-recipe/favourite-recipe.module').then( m => m.FavouriteRecipePageModule)
      },
      {
        path:'edit/:recipeId',
        loadChildren: () => import('./recipes/edit-recipe/edit-recipe.module').then( m => m.EditRecipePageModule)
      },
      {
        path:':recipeId',
        loadChildren: () => import('./recipes/detail-recipe/detail-recipe.module').then( m => m.DetailRecipePageModule)
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
