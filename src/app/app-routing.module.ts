import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostsComponent} from './posts/posts.component'
import {LoginComponent} from './login/login.component'
import {SinglePostComponent} from './single-post/single-post.component'
import {CreatePostComponent} from './create-post/create-post.component'


import {AuthGuard} from './auth.guard'
import {AdminAuthGuard} from './admin-auth.guard'


const routes: Routes = [
  {
    path: '',
    redirectTo: '/posts',
    pathMatch: 'full'
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'user/login',
    component: LoginComponent
  },
  {
    path: 'admin/login',
    component: LoginComponent
  },
  {
    path: 'user/register',
    component: LoginComponent
  },
  {
    path: 'posts/:id',
    component: SinglePostComponent
  },
  {
     path: 'post/create-post',
    // canActivate: [AuthGuard],
    component: CreatePostComponent
  },
  {
    path: 'post/create-post/:id',
    component: CreatePostComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
