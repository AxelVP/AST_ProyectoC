const { exists } = require('./modelo/esquema');
var Usuarios = require ('./modelo/esquema');


exports.getUsuario = function (request, response) {

    let ID_usuario = String(request.params.ID_usuario);

    Usuarios.find({
        'ID_usuario' : ID_usuario
    }).exec(function(error, usuario) {
        if(error){
            console.log("Error en getUsuario");
            response.json({status: "Error al encontrar el usuario"})
        }else{
            response.send(usuario[0]);
        }
    })

}

exports.postUsuario = function (request, response) {

    let ID_usuario = request.body.ID_usuario;
    let rol = request.body.rol;

    Usuarios.find({
        ID_usuario : ID_usuario
    }).countDocuments(function(err, count) {
        if(count!=0){
            response.send(true);
        }else{
            
            Usuarios.create({
                ID_usuario : ID_usuario,
                rol : rol
            },
            function(error){
                if(error) {
                    response.json({status: "Error al crear el usuario"})
                }else{
                    response.send(ID_usuario);
                }
            });
        }
    });            
    
}

exports.deleteUsuario = function (request, response) {

    let ID_usuario = String(request.params.ID_usuario);

    Usuarios.findOneAndDelete({
        ID_usuario : ID_usuario
    },function(error, usuario){

        if(usuario == null){
            response.json("false");
        }else if(error) {
            console.log("Error al eliminar")
        }else{
            response.json({ status: "Usuario borrado"});
        }
    })

}