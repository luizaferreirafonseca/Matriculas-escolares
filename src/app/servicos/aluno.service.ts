import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../matriculas/alunos/Modelos/Aluno';
import { NovoAluno } from '../matriculas/alunos/Modelos/NovoAluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {


  private url:string = 'http://localhost:3000/alunos'; 

  constructor(private http:HttpClient) { }



  //Método para visualização 

  pegarAlunos():Observable<Aluno[]>{
    return this.http.get<Aluno[]>(this.url);
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


cadastrar(obj:NovoAluno):Observable<NovoAluno>{
  return this.http.post<Aluno>(this.url, obj)
}



}
