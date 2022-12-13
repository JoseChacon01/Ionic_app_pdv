import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Api } from 'src/services/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = ""; //Campos que o usuario vai utilizar para logar/ usuarios=email ou  cpf
  senha: string = "";
  
  constructor(
    private router:Router, 
    private provider: Api, //importando a class Apis que está dentro da pasta "Services" -> Necario fazr essa ligação para add um novo usuario.
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async mensagem(mensagem, cor){
    const toast = await this.toastController.create({ //É criada a "const" segundo a documentação e passado algumas propriedades como a mensagem, duração, botões, cores, etc. 
      message: mensagem,
      duration:2000,
      color: cor
    });
    toast.present();

  }

  login(){  //"Promise" serve para solicitar ou receber alguma informação de um determinado local. Toda função do tipo "inserir e editar", por exemplo, irá se iniciar assim.
    return new Promise(resolve => {
      let dados = { //P1. Todos esses dados, vão armazenar os dados que o usuário digita no formulário. por isso que tem o "this." isso quer dizer que o "nome" da variável
                   // P2.  "dados" vai armazenar o mesmo valor do "nome" declarado acima, que vai receber o valor do formulário, digitado pelo usuário. 

        usuario: this.usuario,
        senha: this.senha,
      }  
      
      this.provider.dadosApi(dados, 'login/login.php' ).subscribe(
        data=>{
                              //P1. Se tiver tudo certo no preenchimento do login 'ok' o usuário será direcionado para pagina que seu "nivel" dá acesso.
          if(data['ok'] == true){    
            this.mensagem(data['mensagem'], 'success');    
          
          if(data['usu']['nivel'] == 'Administrador'){
            this.router.navigate(['folder']);
          }

          if(data['usu']['nivel'] == 'Tesoureiro'){
            this.router.navigate(['painel-financeiro']);
          } 

        }else{
          this.mensagem(data['mensagem'], 'danger'); //Caso não seja preenchido corretamente, irá ser exibida a mensagem definida em "login.php" na cor "danger". 
        }

        }
      ) 
    }) 
  }


}



