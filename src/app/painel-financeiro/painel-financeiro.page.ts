import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painel-financeiro',
  templateUrl: './painel-financeiro.page.html',
  styleUrls: ['./painel-financeiro.page.scss'],
})
export class PainelFinanceiroPage implements OnInit {

  constructor(
    private router:Router,
  ) { }

  ngOnInit() {
  }

  logout(){
    this.router.navigate(['/login'])
  }

}
