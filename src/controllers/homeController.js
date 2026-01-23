const ProductModel = require('../models/productsModel')
const CategoryModel = require('../models/categoryModel')

class HomeController {
    
  async index(req, res) {
    const result = await ProductModel.getAll()

    const slides = result.rows.map(product => ({
      image: product.image,
      name: product.name,
      description: product.description,
      price: product.price
    }))

    const trending = await ProductModel.getTrendingSofas(12)
    const categoriesResult  = await CategoryModel.getOverview()
    const categories = categoriesResult.rows
    res.render(
      'home',
      {
        slides,
        trendingProducts: trending.rows,
        categoriesTop: categories.slice(0, 3),
        categoriesBottom: categories.slice(3, 5)},
      )
  }

}

module.exports = new HomeController()
