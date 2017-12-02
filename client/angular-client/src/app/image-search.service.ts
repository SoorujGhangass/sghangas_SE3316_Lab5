import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogService } from 'log.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ImageSearchService {
  
  URL_List: String[] = [];

  constructor( 
    private http: HttpClient,
    private logService: LogService) { }
    
  getURLs(searchTerm: String): Observable<String[]>{
    
    this.logService.add('ImageSearchService: Fetched URLs');
    return of (this.URL_List);
  }

}
