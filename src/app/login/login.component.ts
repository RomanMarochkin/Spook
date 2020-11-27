import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MainService } from '../main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private service: MainService) {}
  authForm = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(32),
      Validators.pattern('^[a-zA-Zа-яА-Я]+$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.pattern('^[a-zA-Z0-9]+$'),
    ])
  });
  get login(){return this.authForm.get('login')}
  get password(){return this.authForm.get('password')}
  checked = false
  onSubmit() {
    if(this.authForm.valid){
      this.service.login(this.authForm.value).subscribe(data => {
        const token = data.access_token
        localStorage.setItem('token', token)
        this.service.setIsAuth(true)
      });
    }
    if(!this.authForm.valid){
      this.checked = true
    }
  }
}
