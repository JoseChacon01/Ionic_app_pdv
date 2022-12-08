import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from 'src/services/api';

@Component({
  selector: 'app-mostrar-usuarios',
  templateUrl: './mostrar-usuarios.page.html',
  styleUrls: ['./mostrar-usuarios.page.scss'],
})
export class MostrarUsuariosPage implements OnInit {

  nome: string = "";
  cpf: string = "";
  email: string = "";
  senha: string = "";
  nivel: string = "";
  id: string = "";
  

  constructor(
    private router:Router, 
    private provider: Api, //importando a class Apis que está dentro da pasta "Services" -> Necario fazr essa ligação para add um novo usuario.
    private actRouter:ActivatedRoute, //isso é para que seja possível passar parâmetros entre tela (passar de uma página para outra) 
  ) { }

  
  ngOnInit() {
    this.actRouter.params.subscribe((data:any)=>{ //P1. Quando iremos passar parâmetros, por exemplo? Quando formos editar um dado, quando acessarmos a tela de "edição" 
                                                  //P2. é necessário que os dados de edição venham como parâmetros, de algum lugar. Ou seja, os campos devem vir preenchido, para podermos altera-los. 
      this.id = data.id;
      this.nome = data.nome;
      this.cpf = data.cpf;
      this.email = data.email;
      this.senha = data.senha;
      this.nivel = data.nivel;
    });
  }

  Usuarios(){
    this.router.navigate(['usuarios'])
  }  

}
