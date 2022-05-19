import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compra } from '../models/compras';
import { Articulo } from '../models/articulos';
import { Usuario } from '../models/usuarios';
import { NgForm, NgModel } from '@angular/forms';


@Injectable({
    providedIn: 'root'
})

export class ArticuloTienda {

    URL1 = 'http://localhost:3005/compras/crear';
    URL2 = 'http://localhost:3005/compras/actualizar';
    URL3 = 'http://localhost:3005/compras/eliminar';
    URL4 = 'http://localhost:3005/compras/mostrarHistorial';
    URL5 = 'http://localhost:3005/compras/consultarArticulos';
    URL6 = 'http://localhost:3005/compras/buscar';
    URL7 = 'http://localhost:3005/compras/buscarId';
    URL8 = 'http://localhost:3005/compras/devuelveId';
    URL9 = 'http://localhost:3005/compras/buscarNombreComprador';

    URL_USUARIO = 'http://localhost:3005/compras/verificar';


    recogeDatos: Compra = {
        _id: '',
        ID: 0,
        ID_cliente: 0,
        cantidades: 0,
        nombre_comprador: '',
        direccion_envio: {
            calle: '',
            localidad: '',
            provincia: '',
            cp : 0
        },
        ID_Articulo: ''
    }

    actualizaDatos: Compra = {
        _id: '',
        ID: 0,
        ID_cliente: 0,
        cantidades: 0,
        nombre_comprador: '',
        direccion_envio: {
            calle: '',
            localidad: '',
            provincia: '',
            cp: 0
        },
        ID_Articulo: ''
    }

    busquedaComprador : Compra = {
        _id: '',
        ID: 0,
        ID_cliente: 0,
        cantidades: 0,
        nombre_comprador: '',
        direccion_envio: {
            calle: '',
            localidad: '',
            provincia: '',
            cp: 0
        },
        ID_Articulo: ''

    }

    recogeBusqueda: Articulo = {
        _id: '',
        ID: 0,
        asignatura: '',
        curso_academico: {
            curso: '',
            cuatri: ''
        },
        profesorado: {
            profesor: '',
            departamento: ''
        },

        autor: '',
        cantidad: 0,
        precio: 0,
    }

    recogeFiltro : Articulo = {
        _id: '',
        ID: 0,
        asignatura: '',
        curso_academico: {
            curso: '',
            cuatri: ''
        },
        profesorado: {
            profesor: '',
            departamento: ''
        }
    }

    recogeUsuario: Usuario = {
        ID_usuario: 0
    }


    compra : Compra[] = []
    articulo : Articulo[] = []

    constructor(private http: HttpClient) { }

    getTienda(){

        return this.http.get<Articulo[]>(this.URL5);

    }

    editarCompra(compra : Compra) {
        return this.http.put(this.URL2+`/${compra._id}`,compra);
    }

    getTiendaPorCurso(curso: String, cuatri: String) {

        return this.http.get<Articulo[]>(this.URL6 + `?curso=${curso}&cuatri=${cuatri}`);
    }

    getTiendaPorId(id: string) {

        return this.http.get<Articulo[]>(`${this.URL7}/${id}`);
    }


    getUsuario(ID_usuario: Number) {

        return this.http.get(this.URL_USUARIO + `/${ID_usuario}`);
    }

    crearCompra(compra: Compra){

        return this.http.post(this.URL1+`/${this.recogeDatos.ID_cliente}`,compra);
    }

    devolverHistorial(ID_cliente: Number) {

        return this.http.get<Compra[]>(this.URL4+`/${ID_cliente}`)
    }

    eliminarCompra(_id: String, cantidad: Number, ID_Articulo: Object) {

        return this.http.delete(this.URL3 + `/${_id}`+`?cantidades=${cantidad}&ID_Articulo=${ID_Articulo}`);
    }
    
    devuelveID(){

        return this.http.get(this.URL8);
    }

    buscaComprador(ID_cliente: Number , nombre_comprador : String) {

        return this.http.get<Compra[]>(this.URL9 + `/${ID_cliente}`+ `?nombre_comprador=${nombre_comprador}`);
    }

}