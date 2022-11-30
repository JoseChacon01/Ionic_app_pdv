import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUsuarioPageRoutingModule } from './add-usuario-routing.module';

import { AddUsuarioPage } from './add-usuario.page';

import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddUsuarioPageRoutingModule,
    NgxMaskModule.forRoot({       //SCRIPTS PRONTOS 06 -- BIBLIOTECA DE MASCARAS
      dropSpecialCharacters: false
    }),
  ],
  declarations: [AddUsuarioPage]
})
export class AddUsuarioPageModule {}
