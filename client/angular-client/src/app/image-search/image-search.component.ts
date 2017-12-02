import { Component, OnInit } from '@angular/core';
import { ImageSearchService } from '../image-search.service';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css']
})

export class ImageSearchComponent implements OnInit {
  search:String="";
  
  constructor(private imageSearchService: ImageSearchService) {
  }

  ngOnInit() {
  }
  
  getImages(): void{
    
  }

}
