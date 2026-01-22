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

    res.render('home', {slides})
  }

}

module.exports = new HomeController()
