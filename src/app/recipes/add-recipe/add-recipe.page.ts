import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.page.html',
  styleUrls: ['./add-recipe.page.scss'],
})
export class AddRecipePage implements OnInit {

  formAdd: FormGroup;

  selectedImage: string;

  selectedImageFile;

  constructor(private recipesService: RecipeService, private router: Router, private toastCtr: ToastController) { }

  ngOnInit() {
    this.formAdd = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      imageFile: new FormControl(null, {
      })
    })
  }

  onCreateRecipe(){
    this.recipesService.createRecipe(this.formAdd.value.title, this.formAdd.value.description, this.selectedImage)
    console.log(this.formAdd.value)
    this.presentToast()

    this.formAdd.reset()
    this.router.navigateByUrl('/recipes')
  }

  getImage(){
    if (!Capacitor.isPluginAvailable('Camera')){
      return;
    }
    Plugins.Camera.getPhoto({
      quality:100,
      source: CameraSource.Prompt,
      correctOrientation: true,
      // height: 320,
      // width:200,
      resultType: CameraResultType.DataUrl
    }).then(image =>{
      console.log(image)
      this.selectedImage = image.dataUrl;
      // console.log(this.selectedImage)
      try{
        this.selectedImageFile = base64toBlob(this.selectedImage.replace('data:image/jpeg;base64,', ''), 'image/jpeg');
        console.log(this.selectedImageFile)
        this.formAdd.patchValue({imageFile: this.selectedImageFile}); // passing data to form control we set
      }
      catch (error){
        console.log(error)
      }
    }).catch( error =>{
      console.log(error)
    })
  }

  async presentToast() {
    const toast = await this.toastCtr.create({
      message: "Recipe " + "'"+ this.formAdd.value.title + "'" + " has been created.",
      duration: 2000
    });
    toast.present();
  }

}
