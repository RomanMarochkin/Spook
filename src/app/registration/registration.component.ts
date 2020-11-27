import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MainService } from '../main.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  constructor(private service: MainService, public router: Router) {}
  authForm = new FormGroup({
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
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.pattern('^[a-zA-Z0-9]+$'),
    ])
  });
  get login(){return this.authForm.get('login')}
  get email(){return this.authForm.get('email')}
  get password(){return this.authForm.get('password')}
  checked = false
  onSubmit() {
    if(this.authForm.valid){
      this.service.registration(this.authForm.value).subscribe(data =>{
        this.router.navigate(['login'])
      });
    }
    if(!this.authForm.valid){
      this.checked = true
    }
  }
}