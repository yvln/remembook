const axios = require('axios');
const db = require('../db/config');
const bcrypt = require('bcryptjs');

const User = {};

// Create a user

User.create = (user) => {
  console.log("in user .create", user);
  const passwordDigest = bcrypt.hashSync(user.password, 10);
  return db.oneOrNone(
    'INSERT INTO users (fname, lname, email, login, password_digest, user_image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [user.fname, user.lname, user.email, user.login, passwordDigest, user.image]
  )
};

// Find a user

User.findBylogin = (login) => {
    return db.oneOrNone('SELECT * FROM users WHERE login = $1;', [login]
  )
};

User.findById = (user_id) => {
    return db.oneOrNone('SELECT * FROM users WHERE user_id = $1;', [user_id]
  )
};

// Edit a user

User.edit = (req, res, next) => {
  const {login, fname, lname, email, user_image_url} = req.body;
  const {id} = req.params;
  console.log("req.params edit", req.params);
    db.one(
        `UPDATE users SET login=$1, fname=$2, lname=$3, email=$4, user_image_url=$5
          WHERE user_id=$6 RETURNING *`,
        [login, fname, lname, email, user_image_url, id]
    ).then( updatedUser => {
        res.locals.updatedUser = updatedUser;
        next();
    }).catch( err => {
        console.log(`err: ${err}`);
    });
};

// Delete a User

User.delete = (req, res, next) => {
    db.oneOrNone(
        'DELETE FROM users WHERE user_id=$1', [req.params.id]
    ).then( deletedUser => {
        res.locals.deletedUser = deletedUser;
        next();
    }).catch( err => {
        console.log('err', err);
    });
};

module.exports = User;
