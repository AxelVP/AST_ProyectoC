import { Component, Input, OnInit } from '@angular/core';
import { ArticuloTienda } from 'src/app/services/articulos.servicio';
import { NgForm, NgModel, SelectMultipleControlValueAccessor } from '@angular/forms';
import { Compra } from 'src/app/models/compras';
import { Articulo } from 'src/app/models/articulos';
import { UsuariosComponent } from 'src/app/components/usuarios/usuarios.component';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css'],
  providers: [ArticuloTienda]
})
export class ArticulosComponent implements OnInit {

  comprar: boolean = false;
  historial: boolean = false;
  actualizar: boolean = false;
  static idCliente: Number;


  constructor(public compraTienda : ArticuloTienda) { }

  ngOnInit(): void {
    this.getTienda();

    }
    

    despliegaCompra(articulo: Articulo) {

      this.compraTienda.recogeBusqueda = articulo;

      if(this.comprar == false){
        this.comprar = true;
      }else{
        this.comprar = false;
      }

    }

    getTienda() {
      console.log(ArticulosComponent.idCliente);
      this.compraTienda.getTienda().subscribe((
        res) => {
          this.compraTienda.articulo = res;
        },
        err => console.error(err)
      )
    }
    getArticuloPorAno(curso : String, cuatri : String) {

      this.compraTienda.getTiendaPorCurso(curso,cuatri).subscribe((
        res) => {
          this.compraTienda.articulo = res;
          this.resetFormulario();

        },
        err => console.error(err)
      )
    }

    getArticuloPorId(id : string) {

      this.compraTienda.getTiendaPorId(id).subscribe((
        res) => {
          this.compraTienda.articulo = res;

        },
        err => console.error(err)
      )
    }

    getDevuelveHistorial() {

      let id = ArticulosComponent.idCliente;
      this.compraTienda.devolverHistorial(id).subscribe((
        res) => {

        this.compraTienda.compra = res;
      },
        err => console.log(err)
      )
    }


    getHistorial() {

      if (this.historial == false) {
        this.historial = true;
      } else {
        this.historial = false;
      }

      let id = ArticulosComponent.idCliente;
      this.compraTienda.devolverHistorial(id).subscribe((
        res) => {

          this.compraTienda.compra = res;
        },
        err => console.log(err)
      )
    }



    putCompra(compra : Compra) {

      if(this.actualizar == false) {
        this.actualizar = true;
      } else {
        this.actualizar = false;
      }

      this.compraTienda.actualizaDatos = compra;

    }

    editaCompra(form : NgForm){

      this.compraTienda.editarCompra(form.value).subscribe(
        res => {
          let id = ArticulosComponent.idCliente;
          this.compraTienda.devolverHistorial(id).subscribe((
            res) => {

            this.compraTienda.compra = res;
          },
            err => console.log(err)
          )
          this.resetFormulario(form);
          this.actualizar = false;
        }
        
      )
      alert("Actualizada con exito la compra");
    }


    getBuscaComprador(nombre_comprador : String) {

      let id = ArticulosComponent.idCliente;

      this.compraTienda.buscaComprador(id,nombre_comprador).subscribe((
        res) => {
          this.compraTienda.compra = res;
        }
      )
    }

  postCompra(form: NgForm) {

    if((form.value.cantidades == 0) || (form.value.cantidades == null)){
      alert("Falta el campo cantidad");

    }
    else if ((form.value.nombre_comprador == "") || (form.value.nombre_comprador == null)) {
      alert("Falta el campo nombre");
    }
    else if((form.value.calle == "") || (form.value.calle == null)){
      alert("Falta el campo calle");
    }
    else if ((form.value.localidad == "") || (form.value.localidad == null)) {
      alert("Falta el campo localidad");
    }
    else if ((form.value.provincia == "") || (form.value.provincia == null)) {
      alert("Falta el campo provincia");
    }
    else if ((form.value.cp == 0) || (form.value.cp == null)) {
      alert("Falta el campo codigo postal");
    }
    
    else {

    this.compraTienda.recogeDatos.ID_cliente=ArticulosComponent.idCliente;
    this.compraTienda.crearCompra(form.value).subscribe(
      res => {

        if(res == "false"){
          alert("Cantidad excesiva");
        } else{

          if(this.historial==true) {
            let id = ArticulosComponent.idCliente;
            this.compraTienda.devolverHistorial(id).subscribe((
              res) => {
                this.compraTienda.compra = res;
              },
              err => console.log(err)
              )
            }

            this.resetFormulario(form);
            
            this.compraTienda.devuelveID().subscribe(
              res=> {
                alert("Creado con exito la compra "+res);
                this.getTienda();
              }
              );
          }
          },
          err => console.error(err)
          )
        }
  }


  deleteArticulo(_id: string, cantidad: Number, ID_Articulo: Object) {

    if (confirm("Vas a eliminar una compra, seguro?")) {

      this.compraTienda.eliminarCompra(_id, cantidad, ID_Articulo).subscribe((res) => {
        let id = ArticulosComponent.idCliente;
        this.compraTienda.devolverHistorial(id).subscribe((
          res) => {
          console.log(res);
          this.compraTienda.compra = res;
        },
          err => console.log(err)
        )
        this.getTienda();
        alert("Eliminado con exito");
      });

    }
  }

  resetFormulario(form?: NgForm) {
    if(form) {
      form.reset();
    }
  }

}
