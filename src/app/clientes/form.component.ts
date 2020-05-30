import { Component, OnInit } from '@angular/core';
import { Cliente }  from "./cliente";
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo:string = 'Crear Cliente';

  constructor(private clienteService:ClienteService,
  private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void  //Método para cargar los datos del formulario para actualizar
  {
    this.activatedRoute.params.subscribe(params=>{
      let id= params['id']; //toma el id de la ruta
      if(id) //si el id existe
      {
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente) //se subscribe
      }
    })
  }

  public create():void
  {
    console.log(this.cliente);
    //Registrar el observable
    this.clienteService.create(this.cliente).subscribe(cliente => {
        this.router.navigate(['/clientes']) //Redirigir a clientes para ver el resultado del create
        swal('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito!`,'success') //Alerta
      }
    );

  }

  public update():void
  {
    console.log(this.cliente);
    //Registrar el observable
    this.clienteService.update(this.cliente).subscribe(cliente => {
        this.router.navigate(['/clientes']) //Redirigir a clientes para ver el resultado del create
        swal('Cliente actualizado', `Cliente ${cliente.nombre} actualizado con éxito!`,'success') //Alerta
      }
    );

  }

}
