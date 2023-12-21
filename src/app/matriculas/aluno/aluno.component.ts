import { Component } from '@angular/core';
import { Aluno } from '../alunos/Modelos/Aluno';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../../servicos/aluno.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aluno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './aluno.component.html',
  styleUrl: './aluno.component.css'
})
export class AlunoComponent {


constructor(private route: ActivatedRoute, private servico: AlunoService, private router: Router){}



id:number = 0;

aluno:Aluno = {

}


formulario = new FormGroup({
nome: new FormControl(), 
matricula: new FormControl(),
idade: new FormControl(), 
endereco:  new FormControl(), 
telefone:  new FormControl(), 
media1: new FormControl(), 
media2: new FormControl()

})


ngOnInit(){
  this.route.params.subscribe((params) => this.id = params['id'])

  this.servico.pegarPeloId(this.id)
  .subscribe(dadosAluno => {
    this.aluno = dadosAluno
    this.formulario.setValue({
      nome: dadosAluno.nome, 
      matricula: dadosAluno.matricula,
      idade: dadosAluno.idade,
      endereco: dadosAluno.endereco,
      telefone: dadosAluno.telefone,
      media1: dadosAluno.media1, 
      media2: dadosAluno.media2
    })
    
  });

}


//Método put 

atualizarAluno():void{

let AlunoAtualizado = this.formulario.value as Aluno 
AlunoAtualizado.id = this.aluno.id

this.servico.atualizarAluno(AlunoAtualizado)
.subscribe(dadosAluno => {
  this.aluno = dadosAluno

  this.formulario.reset();


})
}

voltarPaginaMatricula(){
  this.router.navigate(['/alunos'])
}



}

