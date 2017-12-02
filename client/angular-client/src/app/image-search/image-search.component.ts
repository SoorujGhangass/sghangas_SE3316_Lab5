import { Component, OnInit } from '@angular/core';
import { ImageSearchService } from '../image-search.service';

const IMAGE_QUERY_CONSTRAINT: string = "&media_type=image";
const nasaAPI = 'https://images-api.nasa.gov';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css']
})

export class ImageSearchComponent implements OnInit {
  searchTerm:string="";
  nasaSearchURL:string="";
  imageURLs:string[]=[];
  constructor(private imageSearchService: ImageSearchService) {
  }

  ngOnInit() {
  }
  
  getImages(): void{
    this.nasaSearchURL = nasaAPI + "/search?q="+this.searchTerm+IMAGE_QUERY_CONSTRAINT;
    
    this.imageSearchService.getURLs(this.nasaSearchURL)
      .subscribe(imageURLs => {
        this.imageURLs= imageURLs
        console.log(this.imageURLs.length); //CHECK IF THIS RETURNS
      });
  }
  
  fullImage(thumbnailURL:string):string{
    let newURL = thumbnailURL.replace("thumb","orig");
    return newURL;
  }

}
