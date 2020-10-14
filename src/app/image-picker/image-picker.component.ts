// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { Plugins, Capacitor, Camera, CameraSource, CameraResultType } from '@capacitor/core'

// @Component({
//   selector: 'app-image-picker',
//   templateUrl: './image-picker.component.html',
//   styleUrls: ['./image-picker.component.scss'],
// })
// export class ImagePickerComponent implements OnInit {

//   @Output() imagePick = new EventEmitter<string>(); // emitting base64 url

//   seletedImage: string;

//   constructor() { }

//   ngOnInit() {}

//   onPickImage(){
//     if (Capacitor.isPluginAvailable('Camera')){
//       return;
//     }
//     Plugins.Camera.getPhoto({
//       quality: 50,
//       source: CameraSource.Prompt,
//       correctOrientation: true,
//       height: 320,
//       width: 200,
//       resultType: CameraResultType.DataUrl
//     }).then(image =>{
//       this.seletedImage = image.dataUrl;
//       this.imagePick.emit(image.dataUrl);
//     }).catch(error =>{
//       console.log(error)
//       return false;
//     });

//     console.log("Test")
//   }

// }
