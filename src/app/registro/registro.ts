import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  mostrarModal = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      program: ['trabajo', Validators.required],
      consentPrivacy: [false, Validators.requiredTrue],
      consentContact: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.registroForm.invalid) return;

    this.http.post('http://localhost:8080/auth/registro', this.registroForm.value, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.mostrarModal = true;
          this.registroForm.reset();
        },
        error: (err) => {
          alert('Error al enviar el formulario: ' + err.message);
        }
      });
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
}

