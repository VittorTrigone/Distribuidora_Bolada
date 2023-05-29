import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';

const routes: Routes = [
  {path : 'pagina-inicial', component: PaginaInicialComponent},
  {path : 'clientes', component: ClientesComponent},
  {path : 'fornecedores', component: FornecedoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
