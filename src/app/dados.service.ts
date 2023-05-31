import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fornecedor } from './fornecedor';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  url = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  getCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/clientes`);
  }

  saveCli(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${this.url}/clientes`, cliente);
  }

  updateCli(cliente: Cliente): Observable<void>{
    return this.http.put<void>(`${this.url}/clientes/${cliente.id}`, cliente);
  }

  deleteCli(cliente: Cliente): Observable<void>{
    return this.http.delete<void>(`${this.url}/clientes/${cliente.id}`);
  }

  getFornecedor(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${this.url}/fornecedores`);
  }

  saveForn(fornecedor: Fornecedor): Observable<Fornecedor>{
    return this.http.post<Fornecedor>(`${this.url}/fornecedores`, fornecedor);
  }

  updateForn(fornecedor: Fornecedor): Observable<void>{
    return this.http.put<void>(`${this.url}/fornecedores/${fornecedor.id}`, fornecedor);
  }

  deleteForn(fornecedor: Fornecedor): Observable<void>{
    return this.http.delete<void>(`${this.url}/fornecedores/${fornecedor.id}`);
  }
}