'use strict'
var {app,PORT} = require('./app.js');
//var connection = require('./models/dbconnection');

/* 
// Estableciendo conexion database/* 
connection.connect((err)=>{
    if(err) throw err;
    console.log('connection established, ID'+connection.threadId);

    //Create table
    var sql = 'CREATE TABLE pagos (documentoIdentificacionArrendatario INT,codigoInmueble VARCHAR(255),valorPagado INT,fechaPago  )'
}); */ 
// Inicializando API puerto 
app.listen(PORT, function() {
    console.log('Listening on port:',PORT);
});

