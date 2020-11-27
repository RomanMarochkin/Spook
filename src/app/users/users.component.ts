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
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('preloader', [
      transition(':leave', [
        animate('.5s', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class UsersComponent {
  users = null
  userInfo = null
  loadCount = 0
  isLoading = true
  addLoadCount(){
    ++this.loadCount
    if(this.loadCount === 2){
      this.isLoading = false
    }
  }
  constructor(private service: MainService) {
    this.users = service.getUsersInfo()
    this.userInfo = service.getUserInfo()
    this.service.getUsers('').subscribe(data => {
      this.service.setUsersList(data)
      this.addLoadCount()
    });
    this.service.getCurrentUser().subscribe(data => {
      this.service.setCurrentUser(data)
      this.addLoadCount()
    });
  }
  getShortLogin(login: string){
    let shortLogin = login.substr(0, 9) + '...'
    return shortLogin
  }
  followUser(id, e){
    e.stopPropagation()
    this.service.followUser(id).subscribe(data => {
      this.service.updateUserIsFollow(id)
    });
  }
}
