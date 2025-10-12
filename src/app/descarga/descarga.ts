import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-descarga',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './descarga.html',
  styleUrls: ['./descarga.css']
})
export class DescargaComponent {
  descargando: boolean = false;
  error: string = '';

  constructor(private http: HttpClient) {}

  descargarRegistros() {
    this.descargando = true;
    this.error = '';

    this.http.get('http://localhost:8080/auth/todos', { responseType: 'json' })
      .subscribe({
        next: (data: any) => {
          this.generarCSV(data);
          this.descargando = false;
        },
        error: (err) => {
          this.error = 'Error al descargar los registros: ' + err.message;
          this.descargando = false;
        }
      });
  }

  private generarCSV(datos: any[]) {
    if (!datos || !datos.length) return;

    const encabezados = Object.keys(datos[0]);
    const csvRows = [
      encabezados.join(','), // cabecera
      ...datos.map(row => encabezados.map(h => `"${row[h]}"`).join(','))
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'registros.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
