import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {baseUrl} from '../links'

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  apiURL: string;
  constructor(private http: HttpClient
    ) {
      this.apiURL = baseUrl
     }
     getComments(id){
      return this.http.get(this.apiURL+`/comments/${id}`);
    }
    updateComment(id,body){
      return this.http.put(this.apiURL+`/comments/change/${id}`,body);
    }
    createComment(body){
      return this.http.put(this.apiURL+`/comments`,body);
    }
    deleteComment(id){
      return this.http.delete(this.apiURL+`/comments/${id}`);
    }
}
