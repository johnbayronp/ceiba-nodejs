'use strict'
//var db = require('../models/dbconnection');
var Model = require('../models/pagos.model');
var moment = require('moment');

var controller = {

    createPago: async function (req, res) {

        let exist = false;

        await new Model.Pagos({documentoIdentificacionArrendatario: req.body.documentoIdentificacionArrendatario})
            .fetch({require: false})
            .then((pago) => {
                exist = pago
             }).catch((err) => {
                return res.status(500).send({message:'error:'+err})
            })
        
        console.log(exist);
        if (!exist) {
            
            var result = Model.operation.pagoEfectuado(
                req.body.valorPagado,
                req.body.documentoIdentificacionArrendatario,
                req.body.codigoInmueble,
                req.body.fechaPago
            );

            new Model.Pagos({
                documentoIdentificacionArrendatario: result.documentoIdentificacionArrendatario,
                codigoInmueble: result.codigoInmueble,
                valorPagado: result.valorPagado,
                fechaPago: moment(new Date(result.fechaPago)).format('YYYY-MM-DD')
            }).save(null, {method: 'insert'}).then((el)=>{
                if(result.debe){
                    res.status(200).json({
                        message: `gracias por tu abono, sin embargo recuerda que te hace falta pagar ${result.pagoRestante}`
                    })
                }else{
                    res.status(200).json({
                        message: 'gracias por pagar todo tu arriendo'
                    });
                }   
            })
            .catch((err) => {
                return res.status(500).send({message:'error:'+err})
            }); 

            
        }else{
            var result = Model.operation.pagoEfectuado(
                Number(exist.attributes.valorPagado) + Number(req.body.valorPagado),
                exist.attributes.documentoIdentificacionArrendatario,
                exist.attributes.codigoInmueble,
                exist.attributes.fechaPago
            );
    
            new Model.Pagos({
                documentoIdentificacionArrendatario: result.documentoIdentificacionArrendatario,
                codigoInmueble: result.codigoInmueble,
                valorPagado: Number(exist.attributes.valorPagado) + Number(req.body.valorPagado),
                fechaPago: moment(new Date(result.fechaPago)).format('YYYY-MM-DD')
            }).save().then((el)=>{
                //res.status(200).json(el);
                if(result.debe){
                    res.status(200).json({
                        message: `gracias por tu abono, sin embargo recuerda que te hace falta pagar ${result.pagoRestante}`,
                        pago: el
                    })
                }else{
                    res.status(200).json({
                        message: 'gracias por pagar todo tu arriendo'
                    });
                }   
            })
            .catch((err) => {
                res.status(500).send({message:'error:'+err})
            });
        }

    },
    
    // Obtener todos los pagos
    getAllPagos:(req,res)=>{
        console.log('running enpoint')
        new Model.Pagos().fetchAll()
		.then((pagos)=> {
			res.json(pagos);
		}).catch((error) =>{
			console.log(error);
			res.status(401).json({
				message: "An error occured.",
				"error": error.message
			});
		});
    }

}

module.exports = controller;