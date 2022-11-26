import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
    private actRouter:ActivatedRoute, //isso é para que seja possivel passar parametros entre tela (passar de uma pagina para outra 
    public toastController: ToastController //Formato, segundo a documentação para tratar notificações ->  Ele pode ser usado para fornecer feedback sobre uma operação ou para exibir uma mensagem do sistema. 
    ) { } 

  // funções   //Função execultada ao iniciar a pagina
  ngOnInit() {    
   // this.mensagemSucesso(); //Ao iniciar a pagina ADD-USUARIOS a msg de sucesso irá aparecer - TESTE                                              //estamos utilizando o actRouter para passar parametros do tipo dados (data) que podem ser qualquer valor (any), sejam eles int, string, etc. -> Utilizamo o "this."" pq o ele mento "actRouter" estava fora, para chamar ele precisamos disso.
    this.actRouter.params.subscribe((data:any)=>{ // Quando iremos passar parametros, por exemplo? Quando formos editar um dado, quando acessarmos a tela de "edição" é necessario que os dados de edição venham como parametros, de algum lugar. Ou senha, os campos devem vir preenchido, para podermos altera-los.

    });
  }

  //async: Força que seja execultado apenas uma vez por chamada
 async mensagem(mensagem, cor){
    const toast = await this.toastController.create({ // É criada a constaente "const" segundo a documentação e passado algumas propriedades como a mensagem, duração, botões, cores, etc.
      message: mensagem,
      duration:2000,
      color: cor
    });
    toast.present();

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
      }                                                                // chamando a função "dadosApi" que se encontra em "api.ts"-> Passamos para "dadosApi" 2 parametros, que são as informções que estamos passando (dados -> Variavel que foi inserida a cima) e a String da Api (ou seja, a rota do arqui responsavel pela ponte da inserção dos dados no BD)        
      this.provider.dadosApi(dados, 'usuarios/inserir.php' ).subscribe(
        data=>{
          
          if(data['ok'] == true){          //Se tiver tudo certo no preenchimento do formulario 'ok' o usuario sera direcionado(navigate) para pagina "usuarios" e a mensagem definida em "inserir.php" ira receber a cor "suceess".
          this.router.navigate(['usuarios']);
          this.mensagem(data['mensagem'], 'success');
          this.limparCampos(); //Essa função foi criada lá em baixo, ela serve para: Após o usuario criacar no botão de salvar e as informações serem salvas com sucesso, o campo vai retornar vazio quando ele clicar no botão para adicionar o usuario, novamente.
        }else{
          this.mensagem(data['mensagem'], 'danger'); //Caso não seja prenchido corretamente, ira ser exibida a mensagem definida em "inserir.php" na cor "danger"
        }

        }
      ) 
    }) //TUDO ISSO AQUI(DENTRO DE CADASTRAR), QUE FOI DESCRITO ATÉ AGORA, REFERE-SE A FUNÇÃO DE CADASTRAR = Quer dizer que, quando o usuario abrir o formulario, ele vai poder se cadastrar e esses dados vão ser armazenados no BD.
  }

  editar(){
    
  }

  limparCampos(){
    this.nome = "";
    this.cpf = "";
    this.email = "";
    this.senha = "";
    this.nivel = "";

  }
}
