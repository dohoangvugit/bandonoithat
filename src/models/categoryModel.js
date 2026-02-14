const db = require('../config/db');

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
    `;
        return db.query(sql);
    },

    getProductsBySlug(slug) {
        const sql = `
    SELECT
      p.id,
      p.name,
      p.price,
      p.image
    FROM products p
    JOIN product_categories pc ON pc.product_id = p.id
    JOIN categories c ON c.id = pc.category_id
    WHERE c.slug = $1
    ORDER BY p.id DESC
  `;
        return db.query(sql, [slug]);
    },
};

module.exports = CategoryModel;
