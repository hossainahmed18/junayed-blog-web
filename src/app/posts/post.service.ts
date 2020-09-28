import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {baseUrl} from '../links'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiURL: string;
  constructor(private http: HttpClient
    ) {
      this.apiURL = baseUrl
     }
    getAllPost(role){
      return this.http.get(this.apiURL+`/posts/get/${role}`);
    }
    getSinglePost(id){
      return this.http.get(this.apiURL+`/posts/singlepost/${id}`);
    }
    updatePost(id,body){
      return this.http.put(this.apiURL+`/posts/singlepost/${id}`,body);
    }
    createPost(body){
      return this.http.put(this.apiURL+`/posts`,body);
    }
    deletePost(id){
      return this.http.delete(this.apiURL+`/posts/singlepost/${id}`);
    }
}
