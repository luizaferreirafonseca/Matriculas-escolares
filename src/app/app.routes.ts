import { Routes } from '@angular/router';
import { HomeComponent } from './paginainicial/home/home.component';
import { AlunosComponent } from './matriculas/alunos/alunos.component';
import { AlunoComponent } from './matriculas/aluno/aluno.component';

export const routes: Routes = [

{path: 'home', component:HomeComponent},
{path:'alunos', component:AlunosComponent},
{path: 'aluno/:id', component:AlunoComponent},  // (o que vem depois do : é um parâmetro ach dinâmico)
{path: '', redirectTo: '/home', pathMatch: 'full'}


];
