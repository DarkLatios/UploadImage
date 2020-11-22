
import { HttpClient, HttpEventType } from '@angular/common/http';

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,FormsModule,NgForm } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({

  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css'],

})

export class AppComponent {



  // form:FormGroup
  // constructor(private fb:FormBuilder){
  //   this.form=fb.group({
  //     file:new FormControl('')
  //   })
  // }
  // fileChange(e:any){
  //   alert(e.target.files[0].name)
  // }

  constructor(private httpClient: HttpClient) { }

  selectedFile!: File;
  retrievedImage: any;

  base64Data: any;

  retrieveResonse: any;

  message!: string;

  imageName: any;

  public onFileChanged(event:any) {

    this.selectedFile = event.target.files[0];
  }

  

  onUpload() {

    console.log(this.selectedFile);

    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    uploadImageData.append('desc',"This is a file");
    console.log("Filename==",this.selectedFile.name)
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        //console.log("Response-->",response)
        if (response.status === 201) {
          this.message = 'Image uploaded successfully';
        }
      },
      error =>
      this.message=error.error.message
      );
      
  }
    getImage() {
    this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
}
