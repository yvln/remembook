const axios = require('axios');
const db = require('../db/config');

const Article = {};

Article.getRandomArticle = (req, res, next) => {
  const randomIndexMagazine = Math.floor(Math.random()*6)+1;
  db.oneOrNone(
      'SELECT * FROM magazines WHERE magazine_id = $1',
      [randomIndexMagazine]
  ).then(randomMagazine => {
      const urlAPI = `https://newsapi.org/v1/articles?source=${randomMagazine.magazine_name}&sortBy=latest&apiKey=${process.env.NEWS_API_KEY}`;
      const randomIndexArticle = Math.floor(Math.random()*10);
      axios.get(urlAPI)
        .then( response => {
          res.locals.article = {
              magazine_name: randomMagazine.magazine_name,
              magazine_logo: randomMagazine.magazine_logo,
              author: response.data.articles[randomIndexArticle].author,
              title: response.data.articles[randomIndexArticle].title,
              description: response.data.articles[randomIndexArticle].description,
              picture: response.data.articles[randomIndexArticle].urlToImage,
              url: response.data.articles[randomIndexArticle].url,
              date: response.data.articles[randomIndexArticle].publishedAt
          }
          next();
        }).catch(err => {
        })
  }).catch( err => {
      console.log('Article:err.getRandomMagazine', err);
  });
};

module.exports = Article;
