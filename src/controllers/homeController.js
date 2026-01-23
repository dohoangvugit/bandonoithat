const ProductModel = require('../models/productsModel')

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

    res.render(
      'home',
      {slides,trendingProducts: trending.rows},
      )
  }

}

module.exports = new HomeController()
