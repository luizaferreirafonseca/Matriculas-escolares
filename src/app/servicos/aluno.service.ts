import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../matriculas/alunos/Modelos/Aluno';
import { NovoAluno } from '../matriculas/alunos/Modelos/NovoAluno';
import { Serie } from '../matriculas/alunos/Modelos/Series';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {


  private url:string = 'https://students-registers.glitch.me/alunos'; 
  // private url:string = 'http://localhost:3000/alunos'; 
  private urlSeries:string = 'http://localhost:3000/series';

  constructor(private http:HttpClient) { }



  //Método para visualização 

  pegarAlunos():Observable<Aluno[]>{
    return this.http.get<Aluno[]>(this.url);
  }

  pegarSeries():Observable<Serie[]>{
    return this.http.get<Serie[]>(this.urlSeries); 
  }

  pegarPeloId(id:number):Observable<Aluno>{
  return this.http.get<Aluno>(`${this.url}/${id}`)
  }

// Método put/update

atualizarAluno(obj:Aluno):Observable<Aluno>{
  return this.http.put<Aluno>(`${this.url}/${obj.id}`, obj)
  }



// Método remover

remover(id:number):Observable<Aluno[]>{
  return this.http.delete<Aluno[]>(`${this.url}/${id}`)
}


cadastrar(obj:NovoAluno):Observable<Aluno>{
  return this.http.post<Aluno>(this.url, obj)
}



}
