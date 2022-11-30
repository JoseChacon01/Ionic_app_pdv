//TODOS ESSES CÓDIGOS SÃO PADRÃO, SÓ VAI MUDAR O ENDEREÇO ONDE SE ENCONTRAM AS APIS - SCRIPTS PRONTOS 03

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'; /*map é uma biblioteca externa, para a utilização dela nós precisamos instalar um apm atraves do comando:
                                npm install rxjs-compat / Pra que serve o npm? ele trás retornos da api, para sabermos identificar o que 
                               estamos recebendo dela, "deu certo, não deu, se deu certo retorna uma mensagem ou direciona para outra pagina, etc."*/ 


@Injectable()
export class Api{ //Aponta para onde está hospedado o projeto apis - É como se fosse o endereço do site, só que por enquanto está de forma local. 
    server: string = 'http://localhost/apisIonic7/'; 

    constructor(private http : HttpClient){ //para chamar a class é 'HttpClient' preciso ter instanciado ela antes em app.models.ts
       
    }

//DadosApi - Será a função chamada sempre que for necessário listar, editar, adicionar e excluir dados.
     dadosApi(dados: any, api: string){
            const httpOptions = {
                headers: new HttpHeaders({'Content-Type' : 'application/json'})
                }

            let url = this.server + api;
            return this.http.post(url, JSON.stringify(dados), httpOptions).map(res => res);
        }
}
