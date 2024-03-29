import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'], 
})
export class AppComponent {
  public appPages = [ //appPages é onde vai ser carregado nossas páginas  
  //nome dos itens - end. para onde vai ser redirecionado - ícone dele 
    { title: 'Home', url: '/folder', icon: 'home' },
    { title: 'Usuários', url: '/usuarios', icon: 'people' },
    { title: 'Sair', url: '/', icon: 'exit' },
  ];
  /* == public labels: São elementos adicionais que ficavam a baixo, no menu lateral. ==
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];*/
  
  public appPages2 = [ 
    { title: 'Home', url: '/painel-financeiro', icon: 'home' },
    { title: 'contas', url: '/painel-financeiro', icon: 'people' },
    { title: 'Sair', url: '/', icon: 'exit' },
  ];
  url : String;

  constructor(private router: Router) {

    router.events.subscribe(event => {

      if (event instanceof NavigationEnd){
        this.url = event.url;

        console.log(this.url); //Vai apresentar em qual url estou no projeto.
      }
    })
  }
}
