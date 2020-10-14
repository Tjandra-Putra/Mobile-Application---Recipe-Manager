import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { RecipeModel } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Plugins, Capacitor, CameraSource, CameraResultType} from '@capacitor/core';

// Coverting image base64 URL to file type for upload e.g imageExample.jpeg
function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit {

  recipe;
  formEdit: FormGroup;
  isLoading = false;
  selectedImage;
  selectedImageFile;

  constructor(private recipesService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute, private navCtr: NavController, private toastCtr: ToastController) { }

  ngOnInit() {
    // Get the ID from URL
    this.activatedRoute.paramMap.subscribe(paraMapObject =>{
      if (!paraMapObject.has('recipeId')){
        this.navCtr.navigateBack('/recipes');
        return;
      }
      this.isLoading = true;
      this.recipe = this.recipesService.getSingleRecipe(paraMapObject.get('recipeId')).subscribe(
        recipeData =>{
          this.recipe = recipeData;
          this.selectedImage = this.recipe.imageUrl;
          this.formEdit = new FormGroup({
            title: new FormControl(this.recipe.title, {
              updateOn: 'blur',
              validators: [Validators.required]
            }),
            description: new FormControl(this.recipe.description, {
              updateOn: 'blur',
              validators: [Validators.required]
            })
          })
        }
      )

      //  Form Data
      this.formEdit = new FormGroup({
        title: new FormControl(this.recipe.title, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        description: new FormControl(this.recipe.description, {
          updateOn: 'blur',
          validators: [Validators.required]
        })
      })
    })
  }

  getImage(){
    if (!Capacitor.isPluginAvailable('Camera')){
      return;
    }
    Plugins.Camera.getPhoto({
      quality:100,
      source: CameraSource.Prompt,
      correctOrientation: true,
      resultType: CameraResultType.DataUrl
    }).then(image =>{
      console.log(image)
      this.selectedImage = image.dataUrl;
    }).catch( error =>{
      console.log(error)
    })
  }

  onEditRecipe(){
    if (!this.formEdit.valid){
      return;
    }

    console.log(this.formEdit)
    console.log(this.formEdit.value.title)


    this.recipesService.editRecipe(this.recipe.id, this.formEdit.value.title, this.formEdit.value.description, this.selectedImage);

    this.presentToast()

    this.formEdit.reset();
    this.router.navigateByUrl('/recipes');
  }

  async presentToast() {
    const toast = await this.toastCtr.create({
      message: "Changes have been saved successfully.",
      duration: 2000
    });
    toast.present();
  }
 

}
