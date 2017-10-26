const axios = require('axios');
const db = require('../db/config');

const Remembox = {};


// CREATE A REMEMBOX

Remembox.create = (req, res, next) => {
  db.one(
      `INSERT INTO remembox (user_id, rmbdate, category, title, description, picture, mood, mood_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING remembox_id` ,
      [req.session.passport.user.user_id, req.body.rmbdate, req.body.category, req.body.title, req.body.text, req.body.img_url, req.body.mood, res.locals.moodURL]
  ).then( newRmb => {
      res.locals.newRmb = newRmb;
      next();
  }).catch( err => {
      console.log('Remembox:err.create', err);
  });
};

// READ ALL REMEMBOX

Remembox.findAll = (req, res, next) => {
    db.manyOrNone(
        'SELECT * FROM remembox WHERE remembox.user_id = $1 ORDER BY rmbdate DESC', [req.session.passport.user.user_id]
    ).then(allRemembox => {
        res.locals.allRemembox = allRemembox;
        next();
    }).catch( err => {
        console.log('Remembox:err.findAll', err);
    });
};

// READ ONE REMEMBOX

Remembox.findById = (req, res, next) => {
    db.oneOrNone(
        'SELECT * FROM remembox WHERE remembox_id=$1', [req.params.id]
    ).then(rmbById => {
        res.locals.rmbById = rmbById;
        next();
    }).catch( err => {
        console.log('Remembox:err.findById', err);
    });
};

// READ REMEMBOX BY SEARCH


Remembox.findByKwDate = (req, res, next) => {

  const {kw, dt} = req.params;
  console.log("kw", kw);
  console.log("dt", dt);

  let dbSearch = "";

  if (dt === "nodata"){
    dbSearch =
    db.manyOrNone(
      `SELECT * FROM remembox
       WHERE (lower(category) LIKE '%${kw}%'
           OR lower(title) LIKE '%${kw}%'
           OR lower(description) LIKE '%${kw}%'
           OR lower(mood) LIKE '%${kw}%')
       AND user_id=$1`,
      [req.session.passport.user.user_id]
    )
  } else if (kw === 'nodata') {
    dbSearch =
    db.manyOrNone(
      `SELECT * FROM remembox
       WHERE rmbdate=$1
       AND user_id=$2`,
      [dt, req.session.passport.user.user_id]
    )
  } else {
    dbSearch =
      db.manyOrNone(
        `SELECT * FROM remembox
         WHERE (lower(category) LIKE '%${kw}%'
             OR lower(title) LIKE '%${kw}%'
             OR lower(description) LIKE '%${kw}%'
             OR lower(mood) LIKE '%${kw}%')
         AND rmbdate=$1
         AND user_id=$2`,
        [dt, req.session.passport.user.user_id]
      )
  }

   dbSearch
    .then( findByKwDate => {
      console.log("findByKwDate",findByKwDate);
        res.locals.findByKwDate = findByKwDate;
        next();
    }).catch( err => {
        console.log('Remembox:err.findByKwDate', err);
    });
};

// UPDATE A REMEMBOX

Remembox.edit = (req, res, next) => {
  const {rmbdate, category, title, description, picture, mood} = req.body;
  const {moodURL} = res.locals;
  const {id} = req.params;
    db.one(
        `UPDATE remembox SET rmbdate=$1, category=$2, title=$3, description=$4, picture=$5, mood=$6, mood_url=$7
          WHERE remembox_id=$8 RETURNING remembox_id`,
        [rmbdate, category, title, description, picture, mood, moodURL, id]
    ).then( updatedRmb => {
        res.locals.updatedRmb = updatedRmb;
        next();
    }).catch( err => {
      console.log('Remembox:err.edit', err);
    });
};

// DELETE A REMEMBOX

Remembox.delete = (req, res, next) => {
    db.oneOrNone(
        'DELETE FROM remembox WHERE remembox_id=$1', [req.params.id]
    ).then( deletedRmb => {
        res.locals.deletedRmb = deletedRmb;
        next();
    }).catch( err => {
        console.log('Remembox:err.delete', err);
    });
};

// MIDDLEWARE TO ACCESS API DATA

Remembox.getRandomGif = (req, res, next) => {
  const urlAPI = `http://api.giphy.com/v1/gifs/search?q=${req.body.mood}&api_key=${process.env.GIPHY_API_KEY}&limit=15`;
  const randomIndex = Math.floor(Math.random()*15);
  axios.get(urlAPI)
    .then( response => {
      const urlHttps = response.data.data[randomIndex].images.fixed_width.mp4;
      res.locals.moodURL = urlHttps.replace("https", "http");
      next()
    }).catch(err => {
      console.log('Remembox:err.getRandomGif', err);
    })
}

module.exports = Remembox;
