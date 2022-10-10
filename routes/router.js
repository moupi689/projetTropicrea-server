const express = require('express');
const auth = require ('../middleware/auth');
const router = express.Router();


const productCtrl = require('../controllers/products');


router.get('/', productCtrl.findAllProducts);
router.get('/:id',productCtrl.findOneProduct);
router.post('/', productCtrl.createProduct );
router.put('/:id', productCtrl.modifyProduct);
router.delete('/:id', productCtrl.deleteProduct);

module.exports = router;