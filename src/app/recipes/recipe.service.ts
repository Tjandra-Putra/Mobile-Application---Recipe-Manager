import { Injectable } from '@angular/core';
import { RecipeModel } from './recipe.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs'; // Obserables
import { switchMap, tap, map } from 'rxjs/operators'
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient, private loadingCtr: LoadingController) { }

  recipesChanged = new Subject<RecipeModel[]>()

  isFavourtite: boolean = false;

  generatedId : string;

  private _recipes: RecipeModel[] = [
    // new RecipeModel(Math.random().toString(), 
    // 'Cheese cake', 
    // 'Cheesecake is a sweet dessert consisting of one or more layers. The main, and thickest layer, consists of a mixture of soft, fresh cheese', 
    // 'https://i.ytimg.com/vi/yNyeCrKM9Ss/maxresdefault.jpg',
    // this.isFavourtite)
  ]

  getFavouriteRecipe(){
    return {...this.recipes.find(p => p.isFavourite === true)}
  }

  get recipes(){
    return [...this._recipes]
  }

  // getSingleRecipe(recipeId: string){
  //   return {...this.recipes.find(p => p.id === recipeId)} // cloning as well
  // }

  getSingleRecipe(recipeId: string){
    return this.http.get<RecipeModel>(
      `https://ionic-recipe-e5040.firebaseio.com/recipes/${recipeId}.json`
    ).pipe(
      map(
        recipeData =>{
          console.log(new RecipeModel(recipeId, recipeData.title, recipeData.description, recipeData.imageUrl, recipeData.isFavourite))
          this.loadingCtr.dismiss()
          return new RecipeModel(recipeId, recipeData.title, recipeData.description, recipeData.imageUrl, recipeData.isFavourite)
        }
      )
    )
  }

  createRecipe(title: string, description: string, imageUrl: string){
    const newRecipe = new RecipeModel(this.generatedId, title, description, imageUrl, this.isFavourtite); // Just defining or initializing does not do anything. The same code below will replace it

    // Pushing to database
    this.http.post<{name:string}>('https://ionic-recipe-e5040.firebaseio.com/recipes.json', {...newRecipe, id:this.generatedId}).subscribe(resData=>{
      this.generatedId = resData.name;
      const newRecipe = new RecipeModel(this.generatedId, title, description, imageUrl, this.isFavourtite);
      this._recipes.push(newRecipe);
      this.recipesChanged.next(this._recipes);
    })
  
     console.log(this.recipesChanged)
  }

  
  editRecipe(recipeId: string, title: string, description: string, imageUrl: string){
    let recipeIndex = this.recipes.findIndex(rep => rep.id === recipeId); // Get INDEX
    let recipe = [...this.recipes];
    let oldRecipe = recipe[recipeIndex]; // Found Object

    recipe[recipeIndex] = new RecipeModel(oldRecipe.id, title, description, imageUrl, oldRecipe.isFavourite);

    this._recipes = recipe;
    this.recipesChanged.next(this._recipes); // RXJS

    this.http.put(`https://ionic-recipe-e5040.firebaseio.com/recipes/${recipeId}.json`, {...recipe[recipeIndex]}).subscribe()

    console.log(this._recipes)
  }

  deleteRecipe(recipeId: string){
    this._recipes = this._recipes.filter(recipe =>{
      return recipe.id !== recipeId;
    })
    this.recipesChanged.next(this._recipes); // RXJS

    this.http.delete(`https://ionic-recipe-e5040.firebaseio.com/recipes/${recipeId}.json`).subscribe(
      ()=>{
        this.recipesChanged.next(this._recipes); // RXJS
      }
    )
  }

  fetchRecipes(){
    // put return so that you can subscribe from other page/component
    return this.http.get<{[key:string] : RecipeModel}>('https://ionic-recipe-e5040.firebaseio.com/recipes.json').pipe(map(resData =>{
      for (const key in resData){
        if (resData.hasOwnProperty(key)){
          this._recipes.push(new RecipeModel(key, resData[key].title, resData[key].description, resData[key].imageUrl, resData[key].isFavourite))
          this.recipesChanged.next(this._recipes)
        }
        this.loadingCtr.dismiss()
      }
    }))
  }

  bookMarkRecipe(recipeId: string, bookmark: boolean){
    let recipeIndex = this.recipes.findIndex(rep => rep.id === recipeId); // Get INDEX
    let recipe = [...this.recipes];
    let oldRecipe = recipe[recipeIndex]; // Found Object

    recipe[recipeIndex] = new RecipeModel(oldRecipe.id, oldRecipe.title, oldRecipe.description, oldRecipe.imageUrl, bookmark);

    this._recipes = recipe;
    this.recipesChanged.next(this._recipes); // RXJS

    this.http.put(`https://ionic-recipe-e5040.firebaseio.com/recipes/${recipeId}.json`, {...recipe[recipeIndex]}).subscribe()

    console.log(this._recipes)
  }

}
