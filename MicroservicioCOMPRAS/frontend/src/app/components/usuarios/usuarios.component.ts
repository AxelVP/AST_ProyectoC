import { Component, OnInit } from '@angular/core';
import { ArticuloTienda } from 'src/app/services/articulos.servicio';
import { NgForm, NgModel } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios';
import { Observable } from 'rxjs';
import { ArticulosComponent } from 'src/app/components/articulos/articulos.component';


@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css'],
    providers: [ArticuloTienda]
})
export class UsuariosComponent implements OnInit {
    esCliente : boolean = false;

    constructor(public controlUsuario : ArticuloTienda) { }

    ngOnInit(): void {

    }

    comprobarUsuario(ID: Number) {
        
        this.controlUsuario.getUsuario(ID).subscribe(
            res => {
                
                
                if (res == "true") {
                    this.esCliente = true;
                    ArticulosComponent.idCliente = ID;
                } else {
                    this.esCliente = false;
                    alert("No eres un cliente, no tienes permitido el acceso");
                }

            },
            err => console.error(err)
        );

    }
    

}