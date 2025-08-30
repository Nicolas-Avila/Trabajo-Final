import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  imports: [RouterOutlet,IonContent]
})
export class BaseComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}


