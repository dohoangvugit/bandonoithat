const CategoryModel = require('../models/categoryModel');

class CategoryController {
    async index(req, res) {
        const { slug } = req.params;

        const result = await CategoryModel.getProductsBySlug(slug);

        res.render('category', {
            slug,
            products: result.rows,
        });
    }
}

module.exports = new CategoryController();
