import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', //Quando não tiver rota, direcione para "folder" que será a primeira página aberta pelo usuário, você escolhe qual será. 
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'usuarios', //P1. O path é criado altomaticamente ao criar a pagina, assim como o arquivo/doc "usuarios" - 
    loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosPageModule) // P2. Quando chamar "usuarios" ele vai estanciar a classe e retornar a pagina html.
  },
  {
    path: 'add-usuario',
    loadChildren: () => import('./add-usuario/add-usuario.module').then( m => m.AddUsuarioPageModule)
  },
  {
    path: 'mostrar-usuarios',
    loadChildren: () => import('./mostrar-usuarios/mostrar-usuarios.module').then( m => m.MostrarUsuariosPageModule)
  },
  {//Passando parametros entre telas.
    path: 'mostrar-usuarios/:id/:nome/:cpf/:email/:senha/:nivel',
    loadChildren: () => import('./mostrar-usuarios/mostrar-usuarios.module').then( m => m.MostrarUsuariosPageModule)
  },
  {
    path: 'add-usuario/:id/:nome/:cpf/:email/:senha/:nivel',
    loadChildren: () => import('./add-usuario/add-usuario.module').then( m => m.AddUsuarioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'painel-financeiro',
    loadChildren: () => import('./painel-financeiro/painel-financeiro.module').then( m => m.PainelFinanceiroPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
