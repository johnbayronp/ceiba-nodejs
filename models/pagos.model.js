'use strict'
var bookshelf = require('../config/db').bookshelf;


const Pagos = bookshelf.Model.extend({ 
    tableName:'pagos',
    idAttribute: 'documentoIdentificacionArrendatario',
    initialize: function() {
        //this.constructor.__super__.initialize.apply(this, arguments);
        //this.on('saving', this);
    }

});


var createTable = bookshelf.knex.schema.hasTable('pagos').then(function(exists) {
    if(!exists) {

        console.log('Creandoo tabla');
        return bookshelf.knex.schema.createTable('pagos', function(table){
            table.integer('documentoIdentificacionArrendatario');
            table.string('codigoInmueble');
            table.integer('valorPagado');
            table.datetime('fechaPago');
        });
    }

    console.log('Tabla Creada')
});


var operation = {
    pagoEfectuado: (pago, dcIdenti, codInmueble, fPago)=>{

        if(pago==1000000){

            var output = {
                documentoIdentificacionArrendatario: dcIdenti,
                codigoInmueble: codInmueble,
                valorPagado: pago,
                fechaPago: fPago,
                debe: false
            }; 
            return output;
        
        }else{
            const valorMax= 1000000;
            
            //consultar si la persona abona
            var valorRestante = valorMax- pago;

            var out = {
                documentoIdentificacionArrendatario:dcIdenti,
                codigoInmueble:codInmueble,
                valorPagado:pago,
                fechaPago:fPago,
                pagoRestante: valorRestante,
                debe: true
            };
            return out;

        }
    }
}

module.exports ={ 
    Pagos: bookshelf.model('Pagos',Pagos),
    createTable,
    operation
}

