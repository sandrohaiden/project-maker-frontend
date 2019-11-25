import { Injectable } from "@angular/core";
import { url } from "../config.json";
import { HttpClient, HttpParams } from '@angular/common/http';
import Projeto from 'src/app/models/Projeto';

@Injectable({
  providedIn: "root"
})
export class ProjetoService {
  projetos: Projeto[] = [];
  url: string = `${url}/projetos`;

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get(this.url);
  }

  post(body: any){
    return this.http.post(this.url, body);
  }

  put(body: any){
    return this.http.put(`${this.url}/${body.id}`, body);
  }

  delete(body: any){
    return this.http.delete(`${this.url}/${body.id}`, body);
  }
  
  findByNome(nome: string){
    return this.http.get(`${this.url}/?nome=${nome}`);
  }
}
