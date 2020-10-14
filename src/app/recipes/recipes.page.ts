import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RecipeModel } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  constructor(private recipesService: RecipeService, private loadingCtr: LoadingController) { }

  loadedRecipe : RecipeModel[];
  isLoading = false;


  ngOnInit() {
    // this.loadingCtr.create({message: 'Please wait', spinner: "crescent"}).then(loadingEl =>{
    //   loadingEl.present()
    // })
    this.isLoading = true;
    this.loadedRecipe = this.recipesService.recipes;
    
    //Subscribing to the eventEmitter
    this.recipesService.recipesChanged.subscribe(recipe =>{
      this.loadedRecipe = recipe;
      this.isLoading = false;
    });

    // Has to be return type so that it can be subscribed
    this.recipesService.fetchRecipes().subscribe();

    // Loading animation
    // this.loadingCtr.create({keyboardClose: true, message:'Loading...'}).then(loadingEl =>{
    //   loadingEl.present();
    //   setTimeout(() =>{
    //     this.isLoading = false;
    //     loadingEl.dismiss();
    //   }, 1500)
    // })

  }

}
