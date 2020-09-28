import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { PostService } from '../posts/post.service'
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../posts/comment.service'


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  post:any = {}
  user: any = {
    role: "aa",
    sub: '',

  }

  comment = {
    id: 0,
    commentBody: ''
  }


  comments = []

  showcomments = false;
  showcommentbox = false;

  constructor(private authService: AuthService, private _Router: Router, private _Activatedroute: ActivatedRoute, private postService: PostService, private commentService: CommentService) { }

  ngOnInit() {
    let retUser = this.authService.getUserData()
    
    if (retUser != null) {
      this.user = retUser;
    }
    let routeId = Number(this._Activatedroute.snapshot.paramMap.get("id"));
    this.loadPostData(routeId)
    this.loadCommentsData(routeId)
    

  }

  loadPostData(id) {
    this.postService.getSinglePost(id).subscribe((data: any) => {
      this.post = data
    })
  }

  loadCommentsData(id){
    this.commentService.getComments(id).subscribe((data: any) => {
      this.comments = data
    })
  }

  openComments() {
    this.showcomments = !this.showcomments
  }
  openCommentBox() {
    this.showcommentbox = !this.showcommentbox
  }
  setEditComment(comment: any) {
    this.showcommentbox = true;
    this.comment.commentBody = comment.commentBody
    this.comment.id = comment.id
  }

  saveComment() {
    let commentData = {
      commentBody: this.comment.commentBody,
      commenter: this.user.sub,
      postId : this.post.id
    }
    if (this.comment.id == 0) {
      this.commentService.createComment(commentData).subscribe((data: any) => {
        this.comments.splice(0, 0, data)
        this.comment = {
          id: 0,
          commentBody: ''
        }
        this.showcommentbox = false
      })
    } else {
      this.commentService.createComment(commentData).subscribe((data: any) => {

        for (let i = 0; i < this.comments.length; i++) {
          if (this.comments[i].id == data.id) {
            this.comments.splice(i, 1, data)
            this.comment = {
              id: 0,
              commentBody: ''
            }
            this.showcommentbox = false
          }
        }
      })
    }
  }


  deleteComment(comment) {
    if (confirm("Are you sure to delete ?")) {
      this.commentService.deleteComment(comment).subscribe((data: any) => {
        for (let i = 0; i < this.comments.length; i++) {
          if (this.comments[i].id == comment) {
            this.comments.splice(i, 1)
          }
        }
      })
    }
  }



}
