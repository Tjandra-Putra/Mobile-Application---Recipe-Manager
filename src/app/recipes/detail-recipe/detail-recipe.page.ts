import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { RecipeModel } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { RecipesPage } from '../recipes.page';

@Component({
  selector: 'app-detail-recipe',
  templateUrl: './detail-recipe.page.html',
  styleUrls: ['./detail-recipe.page.scss'],
})
export class DetailRecipePage implements OnInit {

  recipes: any;

  isBookMark = '';

  isFavourite = false;

  dummyList : RecipeModel[];


  constructor(private recipesService: RecipeService, private activatedRoute: ActivatedRoute, private navCtr: NavController, private router: Router, private alertCtr: AlertController, private toastCtr: ToastController, private loadingCtr: LoadingController) { }

  ngOnInit() {
    this.loadingCtr.create({message: 'Please wait', spinner: "crescent"}).then(loadingEl =>{
      loadingEl.present()
    })
    this.activatedRoute.paramMap.subscribe(paraMapObject =>{
      if (!paraMapObject.has('recipeId')){
        this.navCtr.navigateBack('/recipes')
        return; 
      }
      this.recipes = this.recipesService.getSingleRecipe(paraMapObject.get('recipeId')).subscribe(
        recipeData=>{
          this.recipes = recipeData; // passing the retrieved object from the service to current variable set here.
          this.isBookMark = this.recipes.isFavourite === true ? 'bookmark' : 'bookmark-outline'
        }
      );

      // this.isBookMark = this.recipes.isFavourite === false ? 'bookmark-outline' : 'bookmark';

      // if (this.recipes.isFavourite === true){
      //   this.isBookMark = 'bookmark'
      // }
      // else{
      //   this.isBookMark = 'bookmark-outline'
      // }
      console.log(this.recipes)

    });
  }

  onDeleteRecipe(){
    this.alertCtr.create({
      header: "Delete " + this.recipes.title,
       message: "Are you sure you want to permanently delete " + this.recipes.title + " ?",
        buttons:[{
          text: 'Cancel',
          role: 'cancel'
        },{
          text: 'Delete',
          handler: () => {
            this.recipesService.deleteRecipe(this.recipes.id);
            this.router.navigateByUrl('/recipes')
            this.presentToast()
          }
        }] 
      }).then(alertElement =>{
        alertElement.present()
      });
  }

  onBookMark(){

    this.isFavourite = true;

    this.recipesService.bookMarkRecipe(this.recipes.id, this.isFavourite)

    this.presentToast_bookmark();

    this.router.navigateByUrl('/recipes')

  }

  async presentToast_bookmark() { // Function
    const toast = await this.toastCtr.create({
      message: "Recipe " + "'"+this.recipes.title + "'" + " has been bookmarked.",
      duration: 2000
    });
    toast.present();
  }

  async presentToast() { // Function
    const toast = await this.toastCtr.create({
      message: "Recipe " + "'"+this.recipes.title + "'" + " has been deleted.",
      duration: 2000
    });
    toast.present();
  }

}
