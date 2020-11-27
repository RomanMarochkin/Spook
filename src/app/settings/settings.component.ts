import { Component } from '@angular/core';
import { MainService } from '../main.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {
  trigger,
  style,
  animate,
  transition,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [
    trigger('preloader', [
      transition(':leave', [
        animate('.5s', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class SettingsComponent {
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
    this.service.getCurrentUser().subscribe(data => {
      this.profileForm.patchValue({
        avatar: data.avatar,
        login: data.login, 
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      this.addLoadCount()
    });
  }
  profileForm = new FormGroup({
    avatar: new FormControl(''),
    login: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(32),
      Validators.pattern('^[a-zA-Zа-яА-Я]+$'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    firstName: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(8),
      Validators.pattern('^[a-zA-Zа-яА-Я]+$'),
    ]),
    lastName: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(8),
      Validators.pattern('^[a-zA-Zа-яА-Я]+$'),
    ]),
  });
  passwordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.pattern('^[a-zA-Z0-9]+$'),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.pattern('^[a-zA-Z0-9]+$'),
    ]),
  });
  get formAvatar(){return this.profileForm.get('avatar')}
  get formLogin(){return this.profileForm.get('login')}
  get formEmail(){return this.profileForm.get('email')}
  get formFirstName(){return this.profileForm.get('firstName')}
  get formLastName(){return this.profileForm.get('lastName')}
  get formPassword(){return this.passwordForm.get('password')}
  get formConfirmPassword(){return this.passwordForm.get('confirmPassword')}
  checked = false
  convertToBase64(file){
    return new Promise ((res,rej) =>{
      const fileReader = new FileReader();
      fileReader.onerror = () => rej('error')
      fileReader.onload = () => res(fileReader.result)
      fileReader.readAsDataURL(file)
    })
  }
  async setAvatar(file){
    this.profileForm.patchValue({
      avatar: await this.convertToBase64(file),
    });
  }
  updateProfile() {
    if(this.profileForm.valid){
      this.service.updateUser(this.profileForm.value).subscribe(data => {
        this.userInfo.currentUser.avatar = data.avatar
        this.userInfo.currentUser.email = data.email
        this.userInfo.currentUser.firstName = data.firstName
        this.userInfo.currentUser.lastName = data.lastName
        this.userInfo.currentUser.login = data.login
      });
    }
    if(!this.profileForm.valid){
      this.checked = true
    }
  }
  checkedPassword = false
  updatePassword(){
    if(this.passwordForm.valid){
      if(this.passwordForm.value.password === this.passwordForm.value.confirmPassword){
        this.service.updatePassword(this.passwordForm.value).subscribe();
      }
    }
    if(!this.passwordForm.valid){
      this.checkedPassword = true
    }
  }
}
