import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { RecipeModel } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-favourite-recipe',
  templateUrl: './favourite-recipe.page.html',
  styleUrls: ['./favourite-recipe.page.scss'],
})
export class FavouriteRecipePage implements OnInit {

  allRecipes : RecipeModel[];

  filteredRecipes: RecipeModel[];

  isBookMarked  = false;

  selectedItem: string;

  constructor(private recipeService: RecipeService, private toastCtr: ToastController) { }

  ngOnInit() {
    this.allRecipes = this.recipeService.recipes;
    this.recipeService.recipesChanged.subscribe(recipe =>{
      this.allRecipes = recipe;
    });

    this.filteredRecipes = this.allRecipes.filter(
      recipe => recipe.isFavourite === true);
      console.log(this.filteredRecipes)
  }

  onRemoveFavourite(recipeId: string){
    const id = recipeId;
    this.recipeService.bookMarkRecipe(id, this.isBookMarked)
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastCtr.create({
      message: "Recipe has been removed from favourite.",
      duration: 2000
    });
    toast.present();
  }

}
