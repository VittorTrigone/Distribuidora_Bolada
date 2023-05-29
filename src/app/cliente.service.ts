import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = "http://localhost:3001/clientes";
  constructor(private http: HttpClient) { }

  getCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url);
  }

  save(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.url, cliente);
  }

  update(cliente: Cliente): Observable<void>{
    return this.http.put<void>(`${this.url}/${cliente.id}`, cliente);
  }

  delete(cliente: Cliente): Observable<void>{
    return this.http.delete<void>(`${this.url}/${cliente.id}`);
  }
}