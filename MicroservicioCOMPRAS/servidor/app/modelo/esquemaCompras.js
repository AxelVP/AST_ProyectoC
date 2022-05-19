var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = mongoose.model('Compra', 
        {
            ID_cliente: Number,

            cantidades: Number,

            nombre_comprador: String,
            
            direccion_envio: {
                calle: String,
                localidad: String,
                provincia: String,
                cp: Number
            },

           ID_Articulo: {type: Schema.ObjectId, ref: 'Tienda' }
    
        });

