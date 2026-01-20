const ProductModel = require('../../models/productsModel');
const fs = require('fs');
const path = require('path');

class AdminProductController {
    // POST /admin/products
    async create(req, res) {
        try {
            const { name, brand, price, description, currentInventory } =
                req.body;

            const imagePath = `/uploads/products/${req.file.filename}`;

            await ProductModel.create({
                name,
                brand,
                price,
                description,
                inventory: currentInventory,
                image: imagePath,
            });

            res.redirect('/admin/products');
        } catch (err) {
            console.error(err);
            res.status(500).send('Create product failed');
        }
    }

    // DELETE /admin/products/:id
    async delete(req, res) {
        try {
            const { id } = req.params;

            const result = await ProductModel.findById(id);
            if (result.rows.length === 0) {
                return res.status(404).json({ success: false });
            }

            const product = result.rows[0];

            const filePath = path.join('public', product.image);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            await ProductModel.deleteById(id);

            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false });
        }
    }

    async index(req, res) {
        try {
            const result = await ProductModel.getAll();

            res.render('admin/products', {
                layout: 'admin',
                products: result.rows,
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error loading products');
        }
    }

    async showAddForm(req, res) {
        res.render('admin/add-product', {
            layout: 'admin',
        });
    }

    // GET /admin/products/:id/edit
    async showEditForm(req, res) {
        const { id } = req.params;

        const result = await ProductModel.findById(id);
        if (result.rows.length === 0) {
            return res.send('Product not found');
        }

        res.render('admin/edit-product', {
            layout: 'admin',
            product: result.rows[0],
        });
    }

    // POST /admin/products/:id
    async update(req, res) {
        const { id } = req.params;
        const { name, price, brand, description, currentInventory } = req.body;

        const result = await ProductModel.findById(id);
        const oldProduct = result.rows[0];

        let imagePath = oldProduct.image;

        // nếu upload ảnh mới
        if (req.file) {
            const fs = require('fs');
            const path = require('path');

            const oldImagePath = path.join('public', oldProduct.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }

            imagePath = `/uploads/products/${req.file.filename}`;
        }

        await ProductModel.update(id, {
            name,
            price,
            brand,
            description,
            inventory: currentInventory,
            image: imagePath,
        });

        res.redirect('/admin/products');
    }
}

module.exports = new AdminProductController();
