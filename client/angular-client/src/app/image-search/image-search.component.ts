import { Component, OnInit } from '@angular/core';
import { ImageSearchService } from '../image-search.service';
import {Link} from '../links'

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
  Links:Object[]=[];
  prevLink:string;
  nextLink:string;
  constructor(private imageSearchService: ImageSearchService) {
  }

  ngOnInit() {
    this.imageURLs=[];
    this.nextLink="";
    this.prevLink="";
  }
  
  getImages(searchURL:string): void{
    this.imageSearchService.getURLs(searchURL)
      .subscribe(imageURLs => {
        this.imageURLs= imageURLs;
      });
      
    this.imageSearchService.getLinks(searchURL)
      .subscribe(links =>{
        this.processJSON(links);
      });

  }
  
  processJSON(data: Object){
    this.nextLink ="";
    this.prevLink="";
    this.Links = data.collection.links;
    console.log(this.Links);
    if(this.Links){
      for (var i=0;i<this.Links.length;i++){
        if(this.Links[i].rel=='next'){
          this.nextLink = this.Links[i].href;
        }
        else{
          this.prevLink = this.Links[i].href
        }
      }
    }
  }
  
  searchImages(){
    this.nasaSearchURL = nasaAPI + "/search?q="+this.searchTerm+IMAGE_QUERY_CONSTRAINT;
    this.getImages(this.nasaSearchURL);
  }
  
  fullImage(thumbnailURL:string):string{
    let newURL = thumbnailURL.replace("thumb","orig");
    return newURL;
  }

}
