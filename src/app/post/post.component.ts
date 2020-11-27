import { MainService } from './../main.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {
  trigger,
  style,
  animate,
  transition,
  state,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
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
    trigger('removeComent', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.6s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('.6s', keyframes([
          style({ opacity: 1, height: '*', marginBottom: '*', offset: 0 }),
          style({ opacity: 0, height: '*', marginBottom: '*', offset: .3 }),
          style({ opacity: 0, height: 0, marginBottom: 0, offset: 1 }),
        ]))
      ])
    ]),
  ],
})
export class PostComponent {
  @Input() post
  @Input() user
  @Input() currentUser
  @Input() isFollow: boolean
  @Input() comments
  @Input() isOpenImagePostModal
  @Input() isLiked
  @Output() isOpenImagePostModalChange = new EventEmitter<boolean>()
  @Output() isFollowChange = new EventEmitter<any>()
  constructor(private service: MainService){}
  followUser(id, e){
    e.preventDefault()
    this.service.followUser(id).subscribe(data => {
      this.service.updateUserIsFollow(id)
    });
  }
  closeModal(){
    this.isOpenImagePostModalChange.emit(false);
  }
  createCommentForm = new FormGroup({
    text: new FormControl('', [
      Validators.required
    ]),
  });
  createComment(){
    if(this.createCommentForm.valid){
      let data = {
        postId: this.post._id,
        ...this.createCommentForm.value
      }
      this.service.createComment(data).subscribe(data => {
        this.service.updateComments(data)
        this.createCommentForm.reset()
      });
    }
  }
  updateCommentForm = new FormGroup({
    text: new FormControl('', [
      Validators.required
    ]),
  });
  isUpdateComment = false
  UpdateComment(){
    if(this.updateCommentForm.valid){
      this.service.updateComment(this.isUpdateComment, this.updateCommentForm.value).subscribe(data => {
        this.service.updateCommentsUpdate(this.isUpdateComment, this.updateCommentForm.value.text)
        this.updateCommentForm.reset()
        this.isUpdateComment = false
      });
    }
  }
  likePost(){
    this.service.likePost(this.post._id).subscribe(data => {
      this.isFollowChange.emit({isLiked: true, id: this.post._id});
      this.isLiked = !this.isLiked
      if(this.isLiked){
        this.post.likes.push({
          avatar: this.currentUser.avatar,
          firstName: this.currentUser.firstName,
          lastName: this.currentUser.lastName,
          login: this.currentUser.login,
          _id: this.currentUser.id,
        })
      }else{
        const index = this.post.likes.findIndex(elem => elem._id === this.currentUser.id)
        this.isFollowChange.emit({isLiked: false, id: this.post._id});
        this.post.likes.splice(index, 1)
      }
    });
  }
  windowWidth = window.innerWidth
  resize(){
    this.windowWidth = window.innerWidth
  }
}