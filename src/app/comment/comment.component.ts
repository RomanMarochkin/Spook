import { MainService } from './../main.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  state,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  animations: [
    trigger('info', [
      transition(':enter', [
        animate('.6s', keyframes([
          style({ opacity: 0, height: 0 , offset: 0 }),
          style({ opacity: 0, height: '30px' , offset: .7 }),
          style({ opacity: 1, height: '30px' , offset: 1 }),
        ]))
      ]),
      transition(':leave', [
        animate('.6s', keyframes([
          style({ opacity: 1, height: '30px' , offset: 0 }),
          style({ opacity: 0, height: '30px' , offset: .3 }),
          style({ opacity: 0, height: 0 , offset: 1 }),
        ]))
      ])
    ]),
  ]
})
export class CommentComponent {
  @Input() closeModal
  @Input() comment
  @Input() currentUser
  @Input() isUpdateComment
  @Output() isUpdateCommentChange = new EventEmitter<boolean>()
  constructor(private service: MainService){}
  isOpenMenu = false
  openMenu(e){
    e.preventDefault()
    this.isUpdateCommentChange.emit(false);
    this.isOpenMenu = !this.isOpenMenu
  }
  deleteComment(e){
    e.preventDefault()
    this.isUpdateCommentChange.emit(false);
    this.service.deleteComment(this.comment.id).subscribe(data => {
      this.service.updateCommentsDelete(this.comment.id)
    });
  }
  updateComment(e){
    e.preventDefault()
    this.isUpdateCommentChange.emit(this.comment.id);
  }
}
