import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fornecedor } from './fornecedor';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  url = "http://localhost:3002/fornecedores";
  constructor(private http: HttpClient) { }

  getFornecedor(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.url);
  }

  save(fornecedor: Fornecedor): Observable<Fornecedor>{
    return this.http.post<Fornecedor>(this.url, fornecedor);
  }

  update(fornecedor: Fornecedor): Observable<void>{
    return this.http.put<void>(`${this.url}/${fornecedor.id}`, fornecedor);
  }

  delete(fornecedor: Fornecedor): Observable<void>{
    return this.http.delete<void>(`${this.url}/${fornecedor.id}`);
  }
}
