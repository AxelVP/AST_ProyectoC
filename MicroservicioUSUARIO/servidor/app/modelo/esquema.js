var mongoose = require('mongoose');

module.exports = mongoose.model('Usuario', 
        {
            ID_usuario: Number,
            
            rol: {
                    type: String,
                    enum: ["administrador", "cliente"]
            }
        });

