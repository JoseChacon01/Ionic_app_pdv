import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  nome: string = "";
  cpf: string = "";
  email: string = "";
  senha: string = "";
  nivel: string = "";
  id: string = "";

  constructor(private router:Router) { }

  /* funções */
  ngOnInit() {
  }

  Usuarios(){
    this.router.navigate(['usuarios'])
  }

  cadastrar(){

  }

  editar(){
    
  }
}
