import { Component } from '@angular/core';
import { Aluno } from './Modelos/Aluno';
import { AlunoService } from '../../servicos/aluno.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NovoAluno } from './Modelos/NovoAluno';

@Component({
  selector: 'app-alunos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.css'
})
export class AlunosComponent {

  

 alunos:Aluno[] = [];


 formulario = new FormGroup({
  nome: new FormControl(''),
  matricula: new FormControl(''),
  idade: new FormControl(''),
  endereco: new FormControl(''),
  telefone: new FormControl(''),
  media1: new FormControl(''),
  media2: new FormControl(''),

 })

 constructor(private servico: AlunoService, private router: Router){

 }

 ngOnInit(){
  this.servico.pegarAlunos()
  .subscribe(dadosAlunos => this.alunos = dadosAlunos); 
 }

visualizarAluno(id:number | undefined){
this.router.navigate([`/aluno/${id}`])
}


remover(id:number):void{
  this.servico.remover(id)
  .subscribe(retorno => {
    let posicaoAluno = this.alunos.findIndex(aluno => {return aluno.id == id});

    //Remover do vetor
    this.alunos.splice(posicaoAluno, 1); 

    this.alunos = retorno; 
  } )
}


cadastrar():void{
  this.servico.cadastrar(this.formulario.value as NovoAluno)
  .subscribe(aluno => {
    this.alunos.push(aluno)

    this.formulario.reset();
  })
}


}
