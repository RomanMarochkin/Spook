import { Component } from '@angular/core';
import { MainService } from '../main.service';
import {
  trigger,
  style,
  animate,
  transition,
  state,
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  animations: [
    trigger('info', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.5s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('.5s', style({ opacity: 0 }))
      ])
    ]),
    trigger('menu', [
      transition(':enter', [
        style({ right: '-70px' }),
        animate('.5s', style({ right: 0 })),
      ]),
      transition(':leave', [
        animate('.5s', style({ right: '-70px' })),
      ])
    ]),
    trigger('menu2', [
      transition(':enter', [
        style({ top: '-80px' }),
        animate('.5s', style({ top: 0 })),
      ]),
      transition(':leave', [
        animate('.5s', style({ top: '-80px' })),
      ])
    ]),
    trigger('main', [
      state('true', style({ marginRight: "70px" })),
      state('false', style({ marginRight: 0 })),
      transition('false <=> true', animate('.5s'))
    ]),
    trigger('main2', [
      state('true', style({ paddingTop: "80px" })),
      state('false', style({ paddingTop: 0 })),
      transition('false <=> true', animate('.5s'))
    ]),
    trigger('preloader', [
      transition(':leave', [
        animate('.5s', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class UserPageComponent {
  userInfo = null
  users = null
  user = null
  isOpenPostModal = false
  isOpenImagePostModal = false
  post = null
  comments = null
  isLiked = false
  loadCount = 0
  isLoading = true
  addLoadCount(){
    ++this.loadCount
    if(this.loadCount === 3){
      this.isLoading = false
    }
  }
  constructor(private service: MainService, private route: ActivatedRoute) {
    this.users = service.getUsersInfo()
    this.userInfo = service.getUserInfo()
    this.route.params.subscribe(params =>{
      this.service.getUserById(params['id']).subscribe(data => {
        this.service.setUserByIdInfo(data)
        this.addLoadCount()
      });
      this.service.getUsers('').subscribe(data => {
        this.service.setUsersList(data)
        this.user = this.users.usersList.find((elem) =>{
          return elem._id === params['id']
        })
        this.addLoadCount()
      });
      this.service.getFollowersAndFollowing(params['id']).subscribe(data => {
        this.service.setFollowersAndFollowing(data)
        this.addLoadCount()
      });
    });
  }
  isUserInfo = false
  setUserInfo(){
    this.isUserInfo = !this.isUserInfo
  }
  isOpenMenu = false
  openMenu(){
    this.isOpenMenu = !this.isOpenMenu
  }
  followUser(id){
    this.service.followUser(id).subscribe(data => {
      this.service.updateUserIsFollow(id)
    });
  }
  addPost(file, title){
    const formData = new FormData()
    formData.append('image', file.files[0])
    formData.append('title', title)
    this.service.createPost(formData).subscribe(data => {
      this.service.updatePosts(data)
      this.isOpenPostModal = false
    });
  }
  getPost(id){
    this.isOpenImagePostModal = true
    this.service.getPostById(id).subscribe(data => {
      this.post = data
      if(this.post.likes.find((elem) => elem._id === this.userInfo.currentUser.id)){
        this.isLiked = true
      }
      this.service.getComments(data._id).subscribe(data => {
        this.service.setComments(data)
        this.comments = data
      });
    });
  }
  closePost(){
    this.isLiked = false
    this.isOpenImagePostModal = false
    this.post = null
    this.service.clearComments()
  }
  windowWidth = window.innerWidth
  resize(){
    this.windowWidth = window.innerWidth
  }
}