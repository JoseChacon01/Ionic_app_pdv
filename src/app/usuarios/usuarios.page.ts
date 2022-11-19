import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})          
            /*construtor/ inicializador*/
export class UsuariosPage implements OnInit {

        /*Tipo do Obj. - Nome(podeser qualquer nome) - Class que pertence*/
  constructor(private router:Router) { }

  ngOnInit() {
  }

  addUsuarios(){         /*Nome da rota que vamos chamar atraves desse metodo, que será acionado quando o usuario clicar no botão, na pagina html de usuarios*/
     this.router.navigate(['add-usuario']); 
  }

}
