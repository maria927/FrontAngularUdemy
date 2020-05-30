import { Injectable } from '@angular/core';
import { CLIENTES } from "./clientes.json";
import { Cliente } from "./cliente";
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http"; //Importar el HttpClient para consumir el restapi
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint:string= 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders ({'Content-Type':'application/json'});

  constructor(private http : HttpClient) { } //Inyecto el HttpClient
  //Convirtiendo Cliente en Stream con Observable
  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES); retornar los clientes estaticos
   //  return this.http.get<Cliente[]>(this.urlEndPoint);  Primera forma de hacer la petición: Se castea con el tipo <Cliente[]>
   return this.http.get(this.urlEndPoint).pipe(   //Segunda forma de hacer la peticion con map
  map((response) => response as Cliente[])
   );
   }


   create(cliente:Cliente): Observable<Cliente> //Crear cliente (Post)
   {
      return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders});
   }

   getCliente(id): Observable<Cliente> //Consultar cliente por id (Get)
   {
      return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
   }

   update(cliente: Cliente): Observable<Cliente>
   {
      return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders} );
   }

   delete(id: number): Observable<Cliente> //Consultar cliente por id (Get)
   {
      return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}` , {headers: this.httpHeaders});
   }
}
