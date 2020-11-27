import { MainService } from './../main.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  trigger,
  style,
  animate,
  transition,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss'],
  animations: [
    trigger('preloader', [
      transition(':leave', [
        animate('.5s', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class FollowersComponent{
  type = ''
  users = null
  userInfo = null
  allUsers = null
  loadCount = 0
  isLoading = true
  addLoadCount(){
    ++this.loadCount
    if(this.loadCount === 2){
      this.isLoading = false
    }
  }
  constructor(private service: MainService, private route: ActivatedRoute){
    this.userInfo = service.getUserInfo()
    this.allUsers = service.getUsersInfo()
    this.type = route.snapshot.data['type']
    this.route.params.subscribe(params =>{
      this.service.getFollowersAndFollowing(params['id']).subscribe(data => {
        this.service.setFollowersAndFollowing(data)
        this.users = service.getFollowersOrFollowing(this.type)
        this.addLoadCount()
      });
      this.service.getUsers('').subscribe(data => {
        this.service.setUsersList(data)
        this.addLoadCount()
      });
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
  getIsFollow(id){
    return this.allUsers.usersList.find(elem => elem._id === id).isFollow
  }
}
