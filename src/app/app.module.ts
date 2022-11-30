import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { Api } from 'src/services/api';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,   //import da biblioteca que vai ser chamada no "api.ts" que auxilia no service para BD externo
    NgxMaskModule.forRoot({       //P1. import da biblioteca que vai possibilitar a utilização de mascara e caracteres nos campos do formulario.
      dropSpecialCharacters: false //P2. Mas antes é preciso instalar no pronpt: npm install --save ngx-mask - É preciso dá o mesmo inport no 
    }),                            //P3. modulo do arquivo que vai ustilizar essa mascara
  ],

//import da class: Apis
  providers: [ Api, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
