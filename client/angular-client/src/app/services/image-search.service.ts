import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { LogService } from './log.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map'
import {Link} from '../links'


@Injectable()
export class ImageSearchService {
  private nasaSearchURL: string;
  private queryString:string;
  URL_List: string[] = [];
  Links: Link[]=[];

  private JSON_OBJECT;

  constructor( 
    private http: HttpClient,
    private logService: LogService) { }
    
  getURLs(nasaSearchURL: string): Observable<string[]>{
    
    this.URL_List = [];
    
    this.http.get(nasaSearchURL).subscribe(data =>{
      this.extractURLs(data);
    });
    
    return of (this.URL_List);
  }
  
  // getLinks(nasaSearchURL: string): Observable<Link[]>{
    
  //   this.Links = [];
  //   this.http.get(nasaSearchURL)
  //     .map((response:Response)=><Link[]>response.json())
  //     .subscribe(data =>{
  //       this.extractLinks(data);
  //       this.log('Fetched '+this.Links.length+ ' Links');
  //       this.log(JSON.stringify(this.Links));
  //   });
    
  //   return of (this.Links);
  // }
  
  getLinks(nasaSearchURL: string){
    return this.http.get(nasaSearchURL)
      .map((response)=>response);
  }

  
  extractURLs(DataJSON): void{
    let itemArray = DataJSON.collection.items;
    for(var i = 0; i<itemArray.length; i++){
      this.URL_List.push(itemArray[i].links[0].href);
    }
    this.log(this.URL_List[0]);
  }
  
  extractLinks(DataJSON):void{
    let linksArray = DataJSON.collection.links;
    //MAKE SURE TO CLEAR LINKS array so you don't just overwrite it!
    for(var i = 0; i<linksArray.length; i++){
      this.Links.push(new Link());
      this.Links[i].href = JSON.stringify(linksArray[i].href);
      if(linksArray[i].rel=='next'){
        this.Links[i].type = "next";
      }
      else{
        this.Links[i].type = "previous";
      }
    }
    
  }
  
  private log(message: string): void {
    this.logService.add('ImageSearchService: ' + message);
  }

}
