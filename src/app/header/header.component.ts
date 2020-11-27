import { Component, Input } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isSearch: boolean
  @Input() login: string
  userInfo = null
  users = null
  constructor(private service: MainService) {
    this.users = service.getUsersInfo()
    this.userInfo = service.getUserInfo()
    this.service.getCurrentUser().subscribe(data => {
      this.service.setCurrentUser(data)
    });
  }
  logout(e){
    e.preventDefault()
    this.service.setIsAuth(false)
  }
  search(e){
    this.service.updateUsersList(
      this.users.startUsersList.filter(elem =>{
        return elem.login.toLowerCase().includes(e.toLowerCase())
      })
    )
  }
  windowWidth = window.innerWidth
  resize(){
    this.windowWidth = window.innerWidth
  }
}
