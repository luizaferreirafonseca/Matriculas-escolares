import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DropdownModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {



constructor(private router: Router){

}


visualizar(){
  this.router.navigate(['/alunos'])
}


registrationSystem:boolean = false;

clickRegistrationSystem(){
  this.registrationSystem = true; 
}



}
