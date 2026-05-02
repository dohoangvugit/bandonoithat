const ProductModel = require('../models/productsModel');
const CategoryModel = require('../models/categoryModel');

class HomeController {
    async index(req, res) {
        try {
            const result = await ProductModel.getAll();

            const slides = result.rows.map((product) => ({
                id: product.id,
                image: product.image,
                name: product.name,
                description: product.description,
                price: product.price,
            }));

            const trending = await ProductModel.getTrendingSofas(12);
            const categoriesResult = await CategoryModel.getOverview();
            const categories = categoriesResult.rows;
            res.render('home', {
                slides,
                trendingProducts: trending.rows,
                categoriesTop: categories.slice(0, 3),
                categoriesBottom: categories.slice(3, 5),
            });
        } catch (error) {
            console.error('❌ Error in home controller:', error.message);
            res.render('home', {
                slides: [],
                trendingProducts: [],
                categoriesTop: [],
                categoriesBottom: [],
            });
        }
    }

    async search(req, res) {
        try {
            const { q } = req.query;
            if (!q || q.trim() === '') {
                return res.redirect('/');
            }

            const result = await ProductModel.search(q);
            res.render('search', {
                keyword: q,
                products: result.rows,
            });
        } catch (error) {
            console.error('❌ Error in search:', error.message);
            res.render('search', {
                keyword: '',
                products: [],
            });
        }
    }
}

module.exports = new HomeController();
