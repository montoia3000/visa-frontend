import { Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro';
import { DescargaComponent } from './descarga/descarga';

export const routes: Routes = [
  { path: '', component: RegistroComponent },
  { path: 'descarga', component: DescargaComponent }
];

