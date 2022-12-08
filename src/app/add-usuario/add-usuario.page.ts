import { Component, OnInit } from '@angular/core';       //DADOS QUE "ALIMENTAM" O HTML
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

  antigo: string = "";
  antigo2: string = "";

  constructor(
    private router:Router, 
    private provider: Api, //importando a class Apis que está dentro da pasta "Services" -> Necario fazr essa ligação para add um novo usuario.
    private actRouter:ActivatedRoute, //isso é para que seja possível passar parâmetros entre tela (passar de uma página para outra) 
    public toastController: ToastController //P1. Formato, segundo a documentação para tratar notificações -> 
    ) { }                                  //P2. Ele pode ser usado para fornecer feedback sobre uma operação ou para exibir uma mensagem do sistema. 

 // funções   //Função executada ao iniciar a página 
  ngOnInit() {    
    this.actRouter.params.subscribe((data:any)=>{ //P1. Quando iremos passar parâmetros, por exemplo? Quando formos editar um dado, quando acessarmos a tela de "edição" ---ROUTER SERVE PARA PASSAR PARAMETROS ENTRE PAGINAS
                                                 //P2. é necessário que os dados de edição venham como parâmetros, de algum lugar. Ou seja, os campos devem vir preenchido, para podermos altera-los. 
      this.id = data.id;
      this.nome = data.nome;
      this.cpf = data.cpf;
      this.email = data.email;
      this.senha = data.senha;
      this.nivel = data.nivel;
  
    });
  }

  //async: Força que seja executado apenas uma vez por chamada 
 async mensagem(mensagem, cor){
    const toast = await this.toastController.create({ //É criada a "const" segundo a documentação e passado algumas propriedades como a mensagem, duração, botões, cores, etc. 
      message: mensagem,
      duration:2000,
      color: cor
    });
    toast.present();

  }


  Usuarios(){
    this.router.navigate(['usuarios'])
  }

  cadastrar(){  //"Promise" serve para solicitar ou receber alguma informação de um determinado local. Toda função do tipo "inserir e editar", por exemplo, irá se iniciar assim.
    return new Promise(resolve => {
      let dados = { //P1. Todos esses dados, vão armazenar os dados que o usuário digita no formulário. por isso que tem o "this." isso quer dizer que o "nome" da variável
                   // P2.  "dados" vai armazenar o mesmo valor do "nome" declarado acima, que vai receber o valor do formulário, digitado pelo usuário. 

        nome: this.nome,
        cpf: this.cpf,
        email: this.email,
        senha: this.senha,
        nivel: this.nivel,
        id: this.id,
      }  
      
       //P1. Chamando a função "dadosApi" que se encontra em "api.ts"-> Passamos para "dadosApi" 2 parâmetros, que são as informações que estamos passando 
      //P2. (dados -> variável que foi inserida a cima) e a String da Api (ou seja, a rota do arquivo responsável pela ponte da inserção dos dados no BD)  
     //P3. COMPLEMENTO: Comunicar a tela de "add-usuario" com a api lá de php -> Importa e declarar a Api em add-usuario.page.ts e no app.module.ts, se não dá erro. logo após, iremos chamar o objeto provider que deve encontrar a função "dadosapi" criada em api.ts, que espera dois parametros, "os dados e a rota da api (arquivo inserir.php)" essa função que fara a conexão entre os 2 arquivos (add-usuarios e inserir.php)-> PASSO OS DADOS E FALO ONDE ELE VAI EXECUTAR ESSES DADOS.
      this.provider.dadosApi(dados, 'usuarios/inserir.php' ).subscribe(
        data=>{
          
          if(data['ok'] == true){              //P1. Se tiver tudo certo no preenchimento do formulário 'ok' o usuário será direcionado(navigate) para pagina "usuarios" e 
          this.router.navigate(['usuarios']); //P2. a mensagem definida em "inserir.php" irá receber a cor "suceess". 
          this.mensagem(data['mensagem'], 'success');
          this.limparCampos(); 
        }else{
          this.mensagem(data['mensagem'], 'danger'); //Caso não seja preenchido corretamente, irá ser exibida a mensagem definida em "inserir.php" na cor "danger". 
        }

        }
      ) 
    }) 
  }


  limparCampos(){
    this.nome = "";
    this.cpf = "";
    this.email = "";
    this.senha = "";
    this.nivel = "";

  }
}
