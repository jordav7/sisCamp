import { Component, Input, OnInit, AfterContentChecked} from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'ld-display-picture',
  templateUrl: './display-picture.component.html',
  styleUrls: ['./display-picture.component.css']
})
export class DisplayPictureComponent implements OnInit, AfterContentChecked {

  urlImage: SafeUrl;
  @Input() image: any;

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit() {

  }

  ngAfterContentChecked(){
    if(this.image){
      this.urlImage = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + this.image);
    } else{
      this.urlImage = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,');
    }
  }

}
