import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from 'src/services/api';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})          
            //construtor - inicializador
export class UsuariosPage implements OnInit {

  itens : any []; //Variavel com a "lista" com as informação que virão do BD
  limit : number = 10; //Quantidade de itens mostrados por tela
  start : number = 0; //Inicialização da lista (0 a 10)
  nome : string = "";// recebe os dados da busca (nome ou cpf)

            //Tipo do Obj. - Nome(podeser qualquer nome) - Class que pertence
  constructor(
    private router:Router,
    private provider: Api, //importando a class Apis que está dentro da pasta "Services" -> Necario fazr essa ligação para add um novo usuario.
    private actRouter:ActivatedRoute, //isso é para que seja possível passar parâmetros entre tela (passar de uma página para outra) 
    ) { }

  ngOnInit() {
    
  }

  addUsuarios(){         
     this.router.navigate(['add-usuario']); 
  }

  ionViewWillEnter(){ //Nesse metodo, toda vez que recarregar a tela, ele vai chamar as informações que estão dentro dele.
    this.itens = [];
    this.start = 0;
    this.carregar();
  }

  carregar(){ //SCRIPTS PRONTOS 08
    return new Promise(resolve => {
      this.itens = []; //Começa vazio, limpa toda vez ao inicializar.
      let dados = { //Dados que vou está passando para minha solicitação na api. 
        
        nome : this.nome,
        limit : this.limit,
        start : this.start
        };

        //Funciona da mesma forma de como foi explicado em add-usuarios.ts -- Se comunica com a api listar.php
        this.provider.dadosApi(dados, 'usuarios/listar.php').subscribe(data => {

        if(data['itens_n'] == '0') { 
          this.ionViewWillEnter(); //Se a quantidade de linhas for = 0, vai execultar o metodo "ionViewWillEnter" - que serve para atualizar novamente o listview
        }else{
          this.itens = [];
          for(let item of data['itens_n']){ //vai limpar, percorrer e adicionar eses dados ao array de itens
            this.itens.push(item);
            
          }
        }
         
         resolve(true);
         
        });
    });
    
  }

  
 //atualizar o list view

 doRefresh(event) { //Sempre que atualizar a pagina, após meio segundo vai rodar novamente o metodo 'ionViewWillEnter'
    
  setTimeout(() => {
    this.ionViewWillEnter();
    event.target.complete();
  }, 500);
}


//barra de rolagem
loadData(event) {

  this.start += this.limit; // O starte passa a incrementar o valor que esta em limete, ou seja, vai ser egibido de 0 a 10/ 10 a 20 / 20 a 20 etc...

  setTimeout(() => {
    this.carregar().then(()=>{ 
      event.target.complete();
     });
   
  }, 500);
  

}

//Em EDITAR E MOSTRAR, ao clicar ira passar os seguintes dados.
editar(id, nome, cpf, email, senha, nivel){
  this.router.navigate(['add-usuario/' + id + '/' + nome + '/' + cpf + '/' + email + '/' + senha + '/' + nivel + '/'])

}

excluir(){

}

mostrar(id, nome, cpf, email, senha, nivel){
  this.router.navigate(['mostrar-usuarios/' + id + '/' + nome + '/' + cpf + '/' + email + '/' + senha + '/' + nivel + '/'])

}

}
