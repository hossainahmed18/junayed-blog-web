import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {AuthService} from'../auth.service'
import {PostService} from'./post.service'
import {CommentService} from'./comment.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

    posts=[]
    overlay=false;
    user:any={
      role:"aa",
      sub: ""

    }

  constructor(private authService:AuthService, private _router: Router,private postService:PostService,private commentService:CommentService) { 

  }

  ngOnInit() {
    
      let retUser=this.authService.getUserData()
      if(retUser!=null){
          this.user=retUser;
      }
      this.loadPosts()

      
  }

  loadPosts(){
    this.postService.getAllPost(this.user.role).subscribe((data:any)=>{
      this.posts=data
    })
  }

  formActive(){
     this.overlay=true
  }
  hideLofForm(){
    this.overlay=false
  }
  
  onDeleteConfirm(event) {
    if (confirm("Are you sure to delete ?")) {
        this.postService.deletePost(event).subscribe((data:any)=>{
          for (let i = 0; i < this.posts.length; i++) {
            if (this.posts[i].id == event) {
              this.posts.splice(i, 1)
            }
          }
        })
    }
  }
  

  checkValidity(){
     if(this.user.sub){
        this._router.navigate(['/post/create-post'])
     }else{
        this.overlay=true
     }
  }


}
