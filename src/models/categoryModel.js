const db = require('../db')

const CategoryModel = {

  getOverview() {
    const sql = `
      SELECT
        c.id,
        c.name,
        c.slug,
        COUNT(pc.product_id) AS total,
        (
          SELECT p.image
          FROM products p
          JOIN product_categories pc2 ON pc2.product_id = p.id
          WHERE pc2.category_id = c.id
          ORDER BY RANDOM()
          LIMIT 1
        ) AS image
      FROM categories c
      LEFT JOIN product_categories pc ON pc.category_id = c.id
      GROUP BY c.id
      ORDER BY c.id
      LIMIT 5
    `
    return db.query(sql)
  }

}

module.exports = CategoryModel
