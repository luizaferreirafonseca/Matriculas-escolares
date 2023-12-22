import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown'; 

interface IMenuItem{
  name:string, 
  subItems: {
    name: string;
    path: string;
  }[],
  isOpen: boolean
  }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DropdownModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

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


constructor(private router: Router){

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
