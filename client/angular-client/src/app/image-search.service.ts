import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ImageSearchService {

  constructor( 
    private http: HttpClient,
    private messageService: MessageService) { }

}
