import { Injectable } from '@angular/core';
import { CLIENTES } from "./clientes.json";
import { Cliente } from "./cliente";
import { Observable, of, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http"; //Importar el HttpClient para consumir el restapi
import {map, catchError} from "rxjs/operators";
import swal from 'sweetalert2';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint:string= 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders ({'Content-Type':'application/json'});

  constructor(private http : HttpClient, private router: Router) { } //Inyecto el HttpClient
  //Convirtiendo Cliente en Stream con Observable
  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES); retornar los clientes estaticos
   //  return this.http.get<Cliente[]>(this.urlEndPoint);  Primera forma de hacer la petición: Se castea con el tipo <Cliente[]>
   return this.http.get(this.urlEndPoint).pipe(   //Segunda forma de hacer la peticion con map
  map((response) => response as Cliente[])
   );
   }

   create(cliente:Cliente): Observable<any> //Crear cliente (Post)
   {
      return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
        catchError(e => { //Manejo de error
          console.error(e.error.mensaje);
          swal('Error al crear cliente', e.error.mensaje, 'error');
          return throwError(e); //Convertir error en un observable
        })
      );
   }

   getCliente(id): Observable<Cliente> //Consultar cliente por id (Get)
   {
      return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => { //Manejo de error
          this.router.navigate(['/clientes'])
          console.error(e.error.mensaje);
          swal('Error', e.error.mensaje, 'error');
          return throwError(e); //Convertir error en un observable
        })
      );
   }

   update(cliente: Cliente): Observable<any>
   {
      return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders} ).pipe(
        catchError(e => { //Manejo de error
          console.error(e.error.mensaje);
          swal('Error al editar el cliente', e.error.mensaje, 'error');
          return throwError(e); //Convertir error en un observable
        })
      );
   }

   delete(id: number): Observable<Cliente> //Consultar cliente por id (Get)
   {
      return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}` , {headers: this.httpHeaders}).pipe(
        catchError(e => { //Manejo de error
          console.error(e.error.mensaje);
          swal('Error al eliminar el cliente', e.error.mensaje, 'error');
          return throwError(e); //Convertir error en un observable
        })
      );
   }
}
