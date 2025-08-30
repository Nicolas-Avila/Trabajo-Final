import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from '../../../core/services/global.service';
import { IonInput, IonItem, IonList, IonText, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true, // si es standalone
  imports: [
    IonInput,
    IonItem,
    IonList,
    IonText,
    IonButton,
    ReactiveFormsModule
  ]
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup; // operador ! para evitar error de inicialización
  mensaje: string = '';

  constructor(private fb: FormBuilder, private globalService: GlobalService) { }

  ngOnInit() {
    // Inicializar el FormGroup con validaciones
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onRegister() {
    if (this.registerForm.invalid) {
      this.mensaje = 'Por favor completa todos los campos correctamente';
      return;
    }

    const { name, email, password } = this.registerForm.value;

    // Llamada al servicio para registrar usuario
    const { data, error } = await this.globalService.signUp(email, password, name);

    if (error) {
      this.mensaje = 'Error: ' + error.message;
    } else {
      this.mensaje = 'Usuario registrado correctamente ✅';
      this.registerForm.reset();
    }
  }
}
