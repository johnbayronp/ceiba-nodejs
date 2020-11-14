var express = require('express');
var router = express.Router();
var controller =  require('../controllers/pagos.controller');
var validaMiddleware = require('../middleware/validator.middleware');


router.post('/pago',validaMiddleware,controller.createPago);
router.get('/pagos',controller.getAllPagos);

module.exports = router;