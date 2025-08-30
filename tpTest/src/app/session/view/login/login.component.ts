import { Component, OnInit } from '@angular/core';
import { IonInput, IonItem, IonList, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports:[IonInput,IonText,IonItem, IonList]
})
export class LoginComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
