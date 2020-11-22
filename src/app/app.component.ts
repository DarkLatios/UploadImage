
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



  constructor(private httpClient: HttpClient) { }

  selectedFile!: File;
  retrievedImage: any;

  base64Data: any;

  retrieveResonse: any;

  message!: string;

  imageName: any;
  imageDesc:any;

  public onFileChanged(event:any) {

    this.selectedFile = event.target.files[0];
  }

  

  

  onUpload() {

    console.log(this.selectedFile);

    const uploadImageData = new FormData();

    if(this.imageDesc===undefined || this.imageDesc===null || this.imageDesc==="")
    {
      this.message="Failed"
      this.imageDesc="Required"
    }

    else{
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    uploadImageData.append('desc',this.imageDesc);



    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        //console.log("Response-->",response)
        if (response.status === 201) {
          this.message = 'Success';
        }
      },
      error =>
      this.message=error.error.message
      );
      
  }
}
}
