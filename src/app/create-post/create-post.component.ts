import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { PostService } from '../posts/post.service'
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  id = 0;

  post: any = {
    title:'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body : 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    id: 1,
    author: 'abc',
    status: 'approved',
  }

  user:any = {
    role: "",
    sub:'',

  }


  constructor(private authService: AuthService, private _Router:Router, private _Activatedroute: ActivatedRoute, private postService: PostService) {

  }

  ngOnInit() {
    let routeId = Number(this._Activatedroute.snapshot.paramMap.get("id"));
    let retUser = this.authService.getUserData()
    if (retUser != null) {
      this.user = retUser;
    }
    if (routeId != null) {
      this.id = Number(routeId)
      this.loadData()
    }
  }

  loadData() {
    this.postService.getSinglePost(this.id).subscribe((data: any) => {
      this.post = data
    })
  }

  savePost(){
      let postData={
        title:this.post.title,
        body : this.post.body,
        author: this.user.sub,
        status: this.post.status
      }
      
      if(this.id==0){
          this.postService.createPost(postData).subscribe((data:any)=>{
              this._Router.navigate(['/posts'])
          })
      }else{
        this.postService.updatePost(postData,this.id).subscribe((data:any)=>{
          this._Router.navigate(['/posts'])
        })
      }

    
  }



}
