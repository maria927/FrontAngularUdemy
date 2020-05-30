import { Component, OnInit } from '@angular/core';
import { Cliente } from "./cliente";
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

//Inyeccion de dependencias
  constructor(private clienteService:ClienteService) { }

  ngOnInit(): void {
    //Registrar el observable
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(cliente: Cliente): void
{
  swal({
    title: 'Está seguro?',
    text: `¿Seguro que desea eliminar el ciente ${cliente.nombre} ${cliente.apellido}`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#4169E1',
    cancelButtonColor: "#800000",
    confirmButtonText: "Si, eliminar",
    cancelButtonText: "No, cancelar",
    confirmButtonClass: "btn btn-success",
    cancelButtonClass: "btn btn-danger",
    buttonsStyling: false,
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      this.clienteService.delete(cliente.id).subscribe(
        response => {
              this.clientes = this.clientes.filter(cli => cli != cliente) //Quitar de la lista al cliente eliminado
             swal(
                'Cliente eliminado!',
                `Cliente ${cliente.nombre} eliminado con éxito.`,
                'success'
              )
              })
    }
  })
}
}
