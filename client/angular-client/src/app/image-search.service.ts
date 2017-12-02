import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogService } from './log.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';




@Injectable()
export class ImageSearchService {
  private nasaSearchURL: string;
  private queryString:string;
  URL_List: string[] = [];

  private JSON_OBJECT;

  constructor( 
    private http: HttpClient,
    private logService: LogService) { }
    
  getURLs(nasaSearchURL: string): Observable<string[]>{
    this.log(JSON.stringify(nasaSearchURL));
    this.URL_List = [];
    
    this.http.get(nasaSearchURL).subscribe(data =>{
      this.extractURLs(data);
    });
    
    this.log('Fetched '+this.URL_List.length+ ' URLs');
    return of (this.URL_List);
  }

  
  extractURLs(DataJSON): void{
    let itemArray = DataJSON.collection.items;
    for(var i = 0; i<itemArray.length; i++){
      this.URL_List.push(itemArray[i].links[0].href);
    }
    this.log(this.URL_List[0]);
  }
  
  private log(message: string): void {
    this.logService.add('ImageSearchService: ' + message);
  }

}
