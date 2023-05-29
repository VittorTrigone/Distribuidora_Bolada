import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesComponent } from './clientes/clientes.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { AppRoutingModule } from './app-routing.module';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';

import { NgxMaskModule } from "ngx-mask";

import { CommonModule } from '@angular/common';
import { CnpjMaskPipe } from './fornecedores/cnpj-mask.pipe';
import { TelefoneMaskPipe } from './fornecedores/telefone-mask.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    FornecedoresComponent,
    PaginaInicialComponent,
    CabecalhoComponent,
    FornecedoresComponent, CnpjMaskPipe, TelefoneMaskPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
