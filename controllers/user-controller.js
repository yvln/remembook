const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');

const User = require('../models/user');

// SIGN UP

router.get('/',
  auth.restrict,
  (req, res) => {
    res.render('user', {
      user: req.user
    });
  }
);

router.post('/signup',
  passport.authenticate(
    'local-signup', {
        failureRedirect: '/',
        successRedirect: '/user',
        failureFlash: 'Login or email already taken.'
    }
  )
);

// LOG IN

router.post('/login',
  passport.authenticate(
    'local-login', {
        failureRedirect: '/',
        successRedirect: '/home',
        failureFlash: 'Invalid username or password.'
    }
));

// LOG OUT

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// EDIT

router.get('/edit',
  auth.restrict,
  (req, res) => {
    res.render('user/edit',{
      user: req.user
    });
  }
);

router.put('/edit/:id',
  auth.restrict,
  User.edit,
  (req, res) => {
    res.json(res.locals.updatedUser);
    res.redirect("/user")
  }
);

router.get('/delete',
  auth.restrict,
  (req, res) => {
    res.render('user',{
      user: req.user
    });
  }
);

router.delete('/delete/:id',
  User.delete,
  (req, res) => {
    res.json(res.locals.deletedUser);
  }
)

module.exports = router;
