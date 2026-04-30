const ProductModel = require('../../models/productsModel');
const CategoryModel = require('../../models/categoryModel');
const fs = require('fs');
const path = require('path');

class AdminProductController {
    // POST /admin/products
    async create(req, res) {
        try {
            const { name, brand, price, description, currentInventory, categoryId } =
                req.body;

            // Kiểm tra file upload
            if (!req.file) {
                return res.status(400).send('Vui lòng chọn ảnh sản phẩm');
            }

            const imagePath = `/uploads/products/${req.file.filename}`;

            const productData = await ProductModel.create({
                name,
                brand,
                price,
                description,
                inventory: currentInventory,
                image: imagePath,
            });

            // Lưu danh mục cho sản phẩm nếu có chọn
            if (categoryId && productData.rows && productData.rows[0]) {
                await ProductModel.addCategory(productData.rows[0].id, categoryId);
            }

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
        try {
            const categories = await CategoryModel.getAll();
            res.render('admin/add-product', {
                layout: 'admin',
                categories: categories.rows,
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error loading form');
        }
    }

    // GET /admin/products/:id/edit
    async showEditForm(req, res) {
        try {
            const { id } = req.params;

            const result = await ProductModel.findById(id);
            if (result.rows.length === 0) {
                return res.send('Product not found');
            }

            const categories = await CategoryModel.getAll();
            const productCategories = await ProductModel.getCategoriesForProduct(id);
            
            // Lấy category_id được chọn
            const selectedCategoryId = productCategories.rows?.[0]?.category_id;

            // Thêm thuộc tính selected vào categories
            const categoriesWithSelected = categories.rows.map(cat => ({
                ...cat,
                selected: cat.id === selectedCategoryId,
            }));

            res.render('admin/edit-product', {
                layout: 'admin',
                product: result.rows[0],
                categories: categoriesWithSelected,
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error loading edit form');
        }
    }

    // POST /admin/products/:id
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, price, brand, description, currentInventory, categoryId } = req.body;

            const result = await ProductModel.findById(id);
            if (result.rows.length === 0) {
                return res.status(404).send('Sản phẩm không tồn tại');
            }

            const oldProduct = result.rows[0];
            let imagePath = oldProduct.image;

            // nếu upload ảnh mới
            if (req.file) {
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

            // Cập nhật danh mục
            if (categoryId) {
                // Xóa tất cả danh mục cũ
                await ProductModel.removeAllCategories(id);
                // Thêm danh mục mới
                await ProductModel.addCategory(id, categoryId);
            }

            res.redirect('/admin/products');
        } catch (err) {
            console.error(err);
            res.status(500).send('Update product failed');
        }
    }
}

module.exports = new AdminProductController();
