import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('error', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1s', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class AppComponent implements OnInit {
  settings = null
  constructor(private service: MainService) {
    this.settings = service.getSettings()
  }
  ngOnInit(){
    this.service.init()
  }
}
