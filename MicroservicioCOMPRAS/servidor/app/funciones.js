var Compra = require('./modelo/esquemaCompras');
var Controller = require ('./controller');
const { collection } = require('./modelo/esquemaCompras');

module.exports = function(app) {

   app.get('/compras/consultarArticulos', Controller.getTienda);

   app.get('/compras/mostrarHistorial/:id', Controller.getHistorialCompras);

   app.get('/compras/verificar/:idUsuario', Controller.getVerificar);

   app.get('/compras/buscarId/:id', Controller.getID);

   app.get('/compras/buscarNombreComprador/:ID_cliente', Controller.getBuscaComprador);

   app.get('/compras/buscar', Controller.getArticulo);

   app.post('/compras/crear/:id', Controller.postCompra);

   app.get('/compras/devuelveId', Controller.getDevuelveID);

   app.put('/compras/actualizar/:_id', Controller.putCompra);

   app.delete('/compras/eliminar/:_id', Controller.deleteCompra);

};