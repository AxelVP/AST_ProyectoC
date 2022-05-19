var Usuario = require('./modelo/esquema');
var Controller = require ('./controller');
const { collection } = require('./modelo/esquema');

module.exports = function(app) {

    app.get('/usuario/mostrarUsuario/:ID_usuario', Controller.getUsuario);

    app.post('/usuario/crear', Controller.postUsuario);
    
    app.delete('/usuario/eliminar/:ID_usuario', Controller.deleteUsuario);

};