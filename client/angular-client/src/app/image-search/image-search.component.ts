import { Component, OnInit } from '@angular/core';
import { ImageSearchService } from '../image-search.service';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css']
})

export class ImageSearchComponent implements OnInit {
  searchTerm:String="";
  imageURLs:String[]=[];
  constructor(private imageSearchService: ImageSearchService) {
  }

  ngOnInit() {
  }
  
  getImages(): void{
    this.imageSearchService.getURLs(this.searchTerm)
      .subscribe(imageURLs => this.imageURLs= imageURLs);
  }

}
