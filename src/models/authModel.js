const db = require('../db');

const auth = {
    register: (values) => {
        const creatUser = `
            insert into users (username, email, phone, password, role)
            values ($1, $2, $3, $4, $5)
        `;
        return db.query(creatUser, values);
    },

    login: (username, password) => {
        const findUser = `
            SELECT *
            FROM users
            WHERE username = $1 AND password = $2
        `;
        return db.query(findUser, [username, password]);
    },
};

//test
// auth.login('user1', '123456')
//   .then(result => console.log(result.rows))
//   .catch(err => console.error(err))

module.exports = auth;
