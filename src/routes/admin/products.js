const express = require('express');
const router = express.Router();

const productController = require('../../controllers/admin/products');
const upload = require('../../mdlw/upload');

router.get('/products', productController.index);
router.get('/products/add', productController.showAddForm);
router.get('/products/:id/edit', productController.showEditForm);

router.post('/products', upload.single('image'), productController.create);
// submit update
router.post('/products/:id', upload.single('image'), productController.update);

router.delete('/products/:id', productController.delete);

module.exports = router;
