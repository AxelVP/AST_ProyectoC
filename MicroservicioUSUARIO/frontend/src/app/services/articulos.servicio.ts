import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuarios';
import { NgForm, NgModel } from '@angular/forms';


@Injectable({
    providedIn: 'root'
})

export class UsuarioTienda {
    
    URL = 'http://localhost:3010/usuario/crear';
    URL1 = 'http://localhost:3010/usuario/eliminar'


    recogeDatos: Usuario = {
        _id: '',
        ID_usuario: 0,
    };

    recogeDatos2: Usuario = {
        _id: '',
        ID_usuario: 0,
    };

    Usuario: Usuario[] = [];



    constructor(private http: HttpClient) {}

    crearUsuario(Usuario: Usuario) {

        return this.http.post(this.URL, Usuario);
    }


    eliminarUsuario(ID_usuario: String) {

        return this.http.delete(this.URL1+`/${ID_usuario}`);

    }

}