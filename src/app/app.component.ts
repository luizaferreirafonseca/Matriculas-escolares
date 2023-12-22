import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './paginainicial/home/home.component';
import { AlunosComponent } from './matriculas/alunos/alunos.component';
import { AlunoComponent } from './matriculas/aluno/aluno.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, AlunosComponent, AlunoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'matriculasAlunos';



}
