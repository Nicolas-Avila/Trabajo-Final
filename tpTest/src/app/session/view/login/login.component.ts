import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from '../../../core/services/global.service';
import { IonInput, IonItem, IonList, IonText, IonButton, IonNav,IonContent } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonItem,
    IonList,
    IonText,
    IonButton,
    ReactiveFormsModule,
    IonNav,
    IonContent,
    RouterLink
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  mensaje: string = '';

  constructor(private fb: FormBuilder, private globalService: GlobalService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      this.mensaje = 'Por favor completa todos los campos correctamente';
      return;
    }

    const { email, password } = this.loginForm.value;
    const { data, error } = await this.globalService.signIn(email, password);

    if (error) {
      this.mensaje = 'Error: ' + error.message;
    } else {
      this.router.navigate(['/tabs/tab1']);
      this.loginForm.reset();
    }
  }

}
