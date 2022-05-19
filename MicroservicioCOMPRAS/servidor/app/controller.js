var Compras = require ('./modelo/esquemaCompras');
var Tienda = require ('./modelo/esquemaArticulos');
var axios = require ('axios');

var index = require ('../index');
const { exists, findById } = require('./modelo/esquemaCompras');
const { default: mongoose } = require('mongoose');
const { json } = require('express');


exports.getVerificar = function (request, response) {

    let idUsuario = String(request.params.idUsuario);

    axios  
        .get('http://localhost:3010/usuario/mostrarUsuario'+`/${idUsuario}`)
        .then(res => {
            let respuesta = res.data.rol;
            if(respuesta=="cliente"){
                response.json("true");
            } else{
                response.json("false");
            }
        })
        .catch(error => {
            console.log(error);
        })
        
}

exports.getTienda = function (request, response) {

    Tienda.find().exec(function(error,tienda) {
        if(error){
            console.log("Error en get");
            response.send("Error al consultar")
        }

        response.send(tienda);
    });
}

exports.getID = function (request, response) {

    let id = String(request.params.id);

    Tienda.find({'_id' : id}).exec(function(error, articulo){
        if(error) {
            console.log("Error al buscar con get");
            response.send("Error al buscar");
        }
        response.send(articulo);
    })
}

exports.getArticulo = function (request, response) {

    let curso = request.query.curso;
    let cuatri = request.query.cuatri;

    Tienda.find({
        curso_academico : {
            curso: curso,
            cuatri : cuatri
        } 
    }).exec(function(error, articulo){
        if(error) {
            console.log("Error al buscar con get");
            response.send("Error al buscar");
        }
        response.send(articulo);
    })
}

exports.getHistorialCompras = function (request, response) {

    let id = String(request.params.id);

    Compras.find({'ID_cliente' : id}).exec(function(error,compras) {
            response.send(compras);
        });
    }


exports.getBuscaComprador = function (request, response) {
    
    let id = String(request.params.ID_cliente);
    let nombreComprador = request.query.nombre_comprador;

    Compras.find({'ID_cliente' : id,'nombre_comprador' : nombreComprador}).exec(function(error, compras) {
        if(error) {
            console.log("Error al buscar la compra");
            response.send("Error al buscar");
        }
        response.send(compras);
    })
}

exports.postCompra = function (request, response) {

        let ID_cliente = String(request.params.id);
        let ID_Articulo = request.body.ID_Articulo;
        let nombreComprador = request.body.nombre_comprador;
        let cantidades = request.body.cantidades;
        let calle = request.body.calle;
        let localidad = request.body.localidad;
        let provincia = request.body.provincia;
        let cp = request.body.cp;

        let calculoCantidad;

        axios  
        .get('http://localhost:3000/tienda/buscarId'+`/${ID_Articulo}`)
        .then(res => {

            calculoCantidad =  res.data[0].cantidad - cantidades;

            
            if(calculoCantidad<0){
                console.log("Imposible comprar el articulo: Cantidad < 0")
                response.json("false");
                
                
            }else{

            axios 
                .put('http://localhost:3000/tienda/actualizarCantidad'+`/${ID_Articulo}`+`?cantidad=${calculoCantidad}`)
                .then(res => {
                    
                })
                .catch(error => {
                    console.log(error);
                })

                Compras.create({
                    ID_cliente : ID_cliente,
                    nombre_comprador: nombreComprador,
                    cantidades: cantidades,
                    direccion_envio: {
                        calle: calle,
                        localidad: localidad,
                        provincia: provincia,
                        cp: cp
                    },
                    ID_Articulo: ID_Articulo
                });
                
                response.json({status : "Compra exitosa" });
            }
        })
        .catch(error => {
            console.log(error);
        })
                
        

        
}

exports.getDevuelveID = function (request, response) {


    Compras.find().sort({$natural : -1}).limit(1).exec(function(error,compras){
        response.json(compras[0]._id.toString());
    }) 


}

exports.putCompra = function (request, response) {


    let id = String(request.params._id);
    let nombreComprador = request.body.nombre_comprador;
    let calle = request.body.calle;
    let localidad = request.body.localidad;
    let provincia = request.body.provincia;
    let cp = request.body.cp;
    
    Compras.findByIdAndUpdate(id, {
        $set: {
            nombre_comprador: nombreComprador,
            "direccion_envio.calle": calle,
            "direccion_envio.localidad": localidad,
            "direccion_envio.provincia": provincia,
            "direccion_envio.cp": cp
            }
        },
     function(error){
        if(error){
        console.log("Error al modificar");
        }
    });

    response.json({ status: "Compra modificada"});

}

exports.deleteCompra = function (request, response) {

    let id = String(request.params._id);
    let cantidades = request.query.cantidades;
    let ID_Articulo = request.query.ID_Articulo;

    calculoCantidad = 0;

     axios  
        .get('http://localhost:3000/tienda/buscarId'+`/${ID_Articulo}`)
        .then(res => {

            calculoCantidad = parseInt(res.data[0].cantidad) + parseInt(cantidades);

          axios 
                .put('http://localhost:3000/tienda/actualizarCantidad'+`/${ID_Articulo}`+`?cantidad=${calculoCantidad}`)
                .then(res => {

                })
                .catch(error => {
                    console.log(error);
                })
          Compras.findByIdAndDelete(
              {'_id': id},
              function(error){
                  if(error){
                      console.log("Error al borrar");
                    }
                }
                );
                response.json({ status: "Compra borrada"});
            });
}