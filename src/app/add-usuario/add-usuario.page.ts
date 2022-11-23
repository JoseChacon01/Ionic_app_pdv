import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { promise } from 'protractor';
import { Api } from 'src/services/api';

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

  constructor(
    private router:Router, 
    private provider: Api, //importando a class Apis que esta dentro da pasta "Services"
    private actRouter:ActivatedRoute //isso é para que seja possivel passar parametros entre tela (passar de uma pagina para outra 

    ) { } 

  // funções 
  ngOnInit() {                                    //estamos utilizando o actRouter para passar parametros do tipo dados (data) que podem ser qualquer valor (any), sejam eles int, string, etc. -> Utilizamo o "this."" pq o ele mento "actRouter" estava fora, para chamar ele precisamos disso.
    this.actRouter.params.subscribe((data:any)=>{ // Quando iremos passar parametros, por exemplo? Quando formos editar um dado, quando acessarmos a tela de "edição" é necessario que os dados de edição venham como parametros, de algum lugar. Ou senha, os campos devem vir preenchido, para podermos altera-los.

    });
  }

  Usuarios(){
    this.router.navigate(['usuarios'])
  }

  cadastrar(){
    return new Promise(resolve => { //"Promise" serve para solicitar ou receber alguma informação de um determinado local. Toda função do tipo "inserir e editar", por exemplo, ira se iniciar assim.
      let dados = { //Todos esses dados, vão armazenar os dados que o usuario digita no formulario. por isso que tem o "this." isso quer dizer que o "nome" da variavel "dados" vai armezenar o mesmo valor do "nome" declarado acima, que vai receber o valor do formuladio, digitado pelo usuarios
        nome: this.nome,
        cpf: this.cpf,
        email: this.email,
        senha: this.senha,
        nivel: this.nivel,
      }
      this.provider.dadosApi(dados, 'usuarios/inserir.php' ) // chamando a função "dadosApi" que se encontra em "api.ts"-> Passamos para "dadosApi" 2 parametros, que são as informções que estamos passando (dados -> Variavel que foi inserida a cima) e a String da Api (ou seja, a rota do arqui responsavel pela ponte da inserção dos dados no BD)
    }) //TUDO ISSO AQUI(DENTRO DE CADASTRAR), QUE FOI DESCRITO ATÉ AGORA, REFERE-SE A FUNÇÃO DE CADASTRAR = Quer dizer que, quando o usuario abrir o formulario, ele vai poder se cadastrar e esses dados vão ser armazenados no BD.
  }

  editar(){
    
  }
}
