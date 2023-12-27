import { Component } from '@angular/core';
import { Aluno } from '../alunos/Modelos/Aluno';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AlunoService } from '../../servicos/aluno.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface IMenuItem{
  name:string, 
  subItems: {
    name: string;
    path: string;
  }[],
  isOpen: boolean
  }
@Component({
  selector: 'app-aluno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './aluno.component.html',
  styleUrl: './aluno.component.css'
})
export class AlunoComponent {


constructor(private route: ActivatedRoute, private servico: AlunoService, private router: Router){}

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


id:number = 0;

aluno:Aluno = {
  id: 0,
  nome: "",
  matricula: 0,
  idade: 0,
  endereco: "", 
  telefone: 0, 
  media1: 0, 
  media2: 0,
  seriesName: "",
  ensinoMedio: false

}



formulario = new FormGroup({
nome: new FormControl('', [Validators.required]), 
matricula: new FormControl(0, [Validators.minLength(5), Validators.pattern(/^[0-9]+$/)]),
idade: new FormControl(), 
endereco:  new FormControl('', [Validators.required]), 
telefone:  new FormControl(0, [Validators.required]), 
media1: new FormControl(0, [Validators.required, Validators.maxLength(2)]), 
media2: new FormControl(0, [Validators.required, Validators.maxLength(2)]), 
seriesName: new FormControl(''),
ensinoMedio: new FormControl()

})


ngOnInit(){
  this.route.params.subscribe((params) => this.id = params['id'])

  this.servico.pegarPeloId(this.id)
  .subscribe(dadosAluno => {
    this.aluno = dadosAluno
    console.log(dadosAluno)
    this.formulario.setValue({
      nome: dadosAluno.nome, 
      matricula: dadosAluno.matricula,
      idade: dadosAluno.idade,
      endereco: dadosAluno.endereco,
      telefone: dadosAluno.telefone,
      media1: dadosAluno.media1, 
      media2: dadosAluno.media2,
      seriesName: dadosAluno.seriesName,
      ensinoMedio: dadosAluno.ensinoMedio
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


voltarPaginaHome(){
  this.router.navigate(['/home'])
}

clickOpenMenu(name:string){
  //pego o index do menu que tem esse nome
  const index = this.menuItems.findIndex(element => element.name === name)
  // mudo a variável do menu que tem esse nome
  this.menuItems[index].isOpen = !this.menuItems[index].isOpen
}


ocultMenus(){
  this.menuItems.forEach(item => item.isOpen = false)
}

visualizar(path:string){
  this.router.navigate([path])
}


}

