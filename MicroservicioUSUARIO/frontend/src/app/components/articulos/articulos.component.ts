import { Component, OnInit } from '@angular/core';
import { UsuarioTienda } from 'src/app/services/articulos.servicio';
import { NgForm, NgModel } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css'],
  providers: [UsuarioTienda]
})
export class ArticulosComponent implements OnInit {

  constructor(public usuarioTienda: UsuarioTienda) { }

  ngOnInit(): void {
    
  }
    curso ="";
    cuatri = "";
    asignatura = "";


    /************************Crear un articulo*********************/

    postUsuario(form : NgForm ){

      if((form.value.ID_usuario == "") || (form.value.ID_usuario == null)){
        alert("Falta el campo asignatura");
      }
      else if (!(form.value.rol == "administrador") && !(form.value.rol == "cliente")) {
        alert("Valor no posible (administrador o cliente)");
      }
    
      else{
        
        this.usuarioTienda.crearUsuario(form.value).subscribe(
          res => {
            if(res==true){
              alert("El usuario ya existe en el sistema");
            }
            else{
              alert("Creado con el usuario : "+res);
            }
            this.resetFormulario(form);
            
          },
          err => console.error(err)
        )
      }
    }

    /************************Eliminar articulo**********************/

    deleteUsuario(form: NgForm) {

      if(confirm("Vas a eliminar un usuario, seguro?")){
        
        this.usuarioTienda.eliminarUsuario(form.value.ID_usuario).subscribe((res) => { 
          console.log(res);  
          if(res == "false"){
              alert("Este usuario no existe");
            }else{
              this.resetFormulario(form);
              alert("Eliminado con exito");
            }
          });
          
        }
  }

  resetFormulario(form?: NgForm) {
    if(form) {
      form.reset();
    }
  }

}
