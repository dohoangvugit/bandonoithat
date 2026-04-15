const express = require('express');
const router = express.Router();

const productController = require('../../controllers/admin/products');
const orderController = require('../../controllers/admin/orders');
const userController = require('../../controllers/admin/users');
const upload = require('../../mdlw/upload');
const requireAdmin = require('../../mdlw/requireAdmin');

// Apply admin middleware to all routes
router.use(requireAdmin);

// Products routes
router.get('/products', productController.index);
router.get('/products/add', productController.showAddForm);
router.get('/products/:id/edit', productController.showEditForm);

router.post('/products', upload.single('image'), productController.create);
// submit update
router.post('/products/:id', upload.single('image'), productController.update);

router.delete('/products/:id', productController.delete);

// Orders routes
router.get('/orders', orderController.index);
router.get('/orders/:id', orderController.detail);
router.post('/orders/:id/update-status', orderController.updateStatus);
router.delete('/orders/:id', orderController.delete);

// Users routes
router.get('/users', userController.index);
router.post('/users/:id/change-role', userController.changeRole);
router.delete('/users/:id', userController.delete);

module.exports = router;
