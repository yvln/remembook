const router = require('express').Router();
const Remembox = require('../models/remembox-model');
const auth = require('../services/auth');

router.get('/',
  auth.restrict,
  (req, res) => {
    res.render('home', {
      user : req.user,
    })
  }
)

router.get('/seeall',
  auth.restrict,
  Remembox.findAll,
  (req, res) => {
    res.render('home', {
      allRemembox: res.locals.allRemembox,
      user : req.user
    })
  }
)

router.post('/seeall',
  Remembox.getRandomGif,
  Remembox.create,
  (req, res) => {
    res.json(res.locals.newRmb)
  }
)

router.get('/search/:kw/:dt',
  auth.restrict,
  Remembox.findByKwDate,
  (req, res) => {
    res.render('home', {
      findByKwDate: res.locals.findByKwDate,
      user: req.user
    });
  }
)

router.get('/delete',
  auth.restrict,
  (req, res) => {
    res.render('home',{
      user: req.user
    });
  }
)

router.delete('/delete/:id',
  Remembox.delete,
  (req, res) => {
    res.json(res.locals.deletedRmb)
  }
)

router.get('/:id',
  auth.restrict,
  Remembox.findById,
  (req, res) => {
    function isSelectedCat() {
      return function(value) {
        if (value === res.locals.rmbById.category) {
          return "selected"
        }
      };
    }
    function isSelectedMood() {
      return function(value) {
        if (value === res.locals.rmbById.mood) {
          return "selected"
        }
      };
    }
    res.render ('remembox/edit', {
      data: res.locals.rmbById,
      isSelectedCat: isSelectedCat,
      isSelectedMood:isSelectedMood,
      user: req.user
    })
  }
)

router.put('/:id',
  Remembox.getRandomGif,
  Remembox.edit,
  (req, res) => {
    res.json(res.locals.updatedRmb)
  }
)

// router.get('/', auth.restrict, Message.findAll, (req, res) => {
//
//   // Massage the messages before sending to view.
//   const messagesForView = res.locals.messages.map(m => {
//     return {
//       message: m.message,
//       user_sent: m.sender_id == req.user.id ? true : null,
//     };
//   });
//
//   res.render('home', { messages: messagesForView });
// });
//
// router.post('/new', auth.restrict, Message.saveUserInput, Message.fetchBotResponse, Message.saveBotResponse, (req, res) => {
//   res.redirect('/messages');
// });

module.exports = router;
