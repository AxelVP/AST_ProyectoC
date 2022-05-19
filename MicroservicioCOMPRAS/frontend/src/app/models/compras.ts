export interface Compra {
    _id: string,
    ID?: Number,
    ID_cliente: Number,

    cantidades: Number,

    nombre_comprador: String,

    direccion_envio: {
        calle: String,
        localidad: String,
        provincia: String,
        cp: Number
    },

    ID_Articulo: Object
}