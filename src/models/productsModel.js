const db = require('../config/db');

const ProductModel = {
    create(data) {
        const sql = `
      INSERT INTO products (name, price, image, description, brand, inventory)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
        const values = [
            data.name,
            data.price,
            data.image,
            data.description,
            data.brand,
            data.inventory,
        ];
        return db.query(sql, values);
    },

    findById(id) {
        const sql = `SELECT * FROM products WHERE id = $1`;
        return db.query(sql, [id]);
    },

    deleteById(id) {
        const sql = `DELETE FROM products WHERE id = $1`;
        return db.query(sql, [id]);
    },

    getAll() {
        const sql = `
      SELECT
        p.id,
        p.name,
        p.price,
        p.image,
        p.inventory
      FROM products p
      ORDER BY p.id ASC
    `;
        return db.query(sql);
    },

    update(id, data) {
        const sql = `
    UPDATE products
    SET
      name = $1,
      price = $2,
      brand = $3,
      description = $4,
      inventory = $5,
      image = $6
    WHERE id = $7
  `;

        const values = [
            data.name,
            data.price,
            data.brand,
            data.description,
            data.inventory,
            data.image,
            id,
        ];

        return db.query(sql, values);
    },
    getTrendingSofas(limit = 10) {
        const sql = `
    SELECT
      p.id, p.name, p.price, p.image
    FROM products p
    JOIN product_categories pc ON pc.product_id = p.id
    JOIN categories c ON c.id = pc.category_id
    WHERE c.slug = 'sofas'
    ORDER BY p.inventory DESC
    LIMIT $1
  `;
        return db.query(sql, [limit]);
    },
};

module.exports = ProductModel;
