'use strict';
var moment = require('moment');

module.exports = (req,res,next) => {
    
    var documentoIdentificacionArrendatario = req.body.documentoIdentificacionArrendatario;
    var codigoInmueble = req.body.codigoInmueble;
    var valorPagado =  req.body.valorPagado;
    var fechaPago =  req.body.fechaPago;

    // Validemos la fecha
    var fecha = moment(fechaPago,"DD/MM/YYYY", true);

    if(fecha.isValid()){

        if(fecha.dayOfYear()%2 === 1 || fecha.year() < 1990){
            return res.status(400).send({
                status: "400 bad request",
                message:'lo siento pero no se puede recibir el pago por decreto de administración'
            });
        }else{

            // Validar el pago  1 - 1Millon
            if(valorPagado >= 1 && valorPagado <= 1000000){
                next();
            }else{
                return res.status(400).send({
                    status:'400 bad Request',
                    message:'No puede realizar el pago revise el monto.'
                });
            }
        };
    }else{
        return res.status(400).send({
            status: "400 bad request",
            message:'Formato de fecha incorrecto'
        });
    }

}