import { MainService } from './../main.service';
import { Component } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
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
    trigger('preloader', [
      transition(':leave', [
        animate('.5s', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class FeedComponent {
  userInfo = null
  loadCount = 0
  isLoading = true
  addLoadCount(){
    ++this.loadCount
    if(this.loadCount === 1){
      this.isLoading = false
    }
  }
  constructor(private service: MainService) {
    this.userInfo = service.getUserInfo()
    this.service.getFeed().subscribe(data => {
      this.service.setFeed(data)
      this.addLoadCount()
    });
  }
  isLikedPost(post){
    if(post.likes.find((elem) => elem._id === this.userInfo.currentUser?.id)){
      return true
    }else{
      return false
    }
  }
  likePost(id, post){
    this.service.likePost(id).subscribe(data => {
      if(data.status === 'liked'){
        post.isLiked = true
        post.likes.push({
          avatar: this.userInfo.currentUser.avatar,
          firstName: this.userInfo.currentUser.firstName,
          lastName: this.userInfo.currentUser.lastName,
          login: this.userInfo.currentUser.login,
          _id: this.userInfo.currentUser.id,
        })
      }else{
        post.isLiked = false
        const index = post.likes.findIndex(elem => elem._id === this.userInfo.currentUser.id)
        post.likes.splice(index, 1)
      }
    });
  }
  isOpenImagePostModal = false
  post = null
  comments = null
  isLiked = false
  user = null
  users = null
  getPost(id){
    this.isOpenImagePostModal = true
    this.service.getPostById(id).subscribe(postData => {
      this.post = postData
      this.isLiked = this.isLikedPost(postData)
      this.service.getComments(postData._id).subscribe(data => {
        this.service.setComments(data)
        this.comments = data
      });
      this.users = this.service.getUsersInfo()
      this.service.getUsers('').subscribe(data => {
        this.service.setUsersList(data)
        this.user = this.users.usersList.find((elem) =>{
          return elem._id === postData.ownerId
        })
      });
      this.service.getUserById(postData.ownerId).subscribe(data => {
        this.service.setUserByIdInfo(data)
      });
    });
  }
  closePost(){
    this.isLiked = false
    this.isOpenImagePostModal = false
    this.post = null
    this.service.clearComments()
  }
  changeIsFollow(e){
    const post = this.userInfo?.feed.find((elem) =>{
      return elem._id === e.id
    })
    post.isLiked = e.isLiked
    if(post.isLiked){
      post.likes.push({
        avatar: this.userInfo.currentUser.avatar,
        firstName: this.userInfo.currentUser.firstName,
        lastName: this.userInfo.currentUser.lastName,
        login: this.userInfo.currentUser.login,
        _id: this.userInfo.currentUser.id,
      })
    }else{
      const index = post.likes.findIndex(elem => elem._id === this.userInfo.currentUser.id)
      post.likes.splice(index, 1)
      const index2 = post.likes.findIndex(elem => elem._id === this.userInfo.currentUser.id)
      post.likes.splice(index2, 1)
    }
  }
  windowWidth = window.innerWidth
  resize(){
    this.windowWidth = window.innerWidth
  }
}
