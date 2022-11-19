import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [ /*appPages é onde vai ser carregado nossas paginas*/
/*nome dos itens - end. para ond vai ser redirecionado - icone dele*/
    { title: 'Home', url: '/folder', icon: 'home' },
    { title: 'Usuários', url: '/usuarios', icon: 'people' },
  ];
  /* == public labels: São elementos adicionais que ficavam a baixo, no menu lateral. ==
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];*/
  constructor() {}
}
