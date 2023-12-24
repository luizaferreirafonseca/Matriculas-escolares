import { Component } from '@angular/core';
import { Aluno } from './Modelos/Aluno';
import { AlunoService } from '../../servicos/aluno.service';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NovoAluno } from './Modelos/NovoAluno';

interface IMenuItem{
  name:string, 
  subItems: {
    name: string;
    path: string;
  }[],
  isOpen: boolean
  }
@Component({
  selector: 'app-alunos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.css'
})
export class AlunosComponent {

  menuItems: IMenuItem[] = [
    {
      name: "All Courses",
      subItems: [
        {
          name: "Kindergarten",
          path: ""
        },
        {
          name: "Elementary",
          path: "/alunos"
        },
        {
          name: "High School",
          path: ""
        }
      ],
      isOpen: false
    },
    {
      name: "Calendars",
      subItems: [
        {
          name: "2022",
          path: ""
        },
        {
          name: "2023",
          path: ""
        },
        {
          name: "2024",
          path: ""
        }
      ],
      isOpen: false
    },
    {
      name: "Registration System",
      subItems: [
        {
          name: "Students",
          path: "/alunos"
        },
        {
          name: "Documents",
          path: ""
        },
        {
          name: "Fees",
          path: ""
        },
  
      ],
      isOpen: false
    },
    {
      name: "Financial",
      subItems: [
        {
          name: "Payments",
          path: ""
        },
        {
          name: "Documents",
          path: ""
        },
        {
          name: "Reports",
          path: ""
        }
      ],
      isOpen: false
    }
  ]


 alunos:Aluno[] = [];


 formulario = new FormGroup({
  nome: new FormControl('', [Validators.required]), 
  matricula: new FormControl(0, [Validators.minLength(5), Validators.pattern(/^[0-9]+$/)]),
  idade: new FormControl(''),
  endereco: new FormControl('', [Validators.required]), 
  telefone: new FormControl(0, [Validators.required]),
  media1: new FormControl(0, [Validators.required, Validators.maxLength(2)]),
  media2: new FormControl(0, [Validators.required, Validators.maxLength(2)]),

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

visualizar(path:string){
  this.router.navigate([path])
}


registrationSystem:boolean = false;


clickOpenMenu(name:string){
  //pego o index do menu que tem esse nome
  const index = this.menuItems.findIndex(element => element.name === name)
  // mudo a variável do menu que tem esse nome
  this.menuItems[index].isOpen = !this.menuItems[index].isOpen
}


ocultMenus(){
  this.menuItems.forEach(item => item.isOpen = false)
}


}
