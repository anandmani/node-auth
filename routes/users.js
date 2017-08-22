var express = require('express');
var router = express.Router();
var multer = require('multer')
var upload = multer({ dest: './uploads' })
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', upload.single('image'), function (req, res, next) {
  const name = req.body.name
  const email = req.body.email
  const username = req.body.username
  const password = req.body.password
  const image = req.body.image
  // console.log(req.file)

  //Form Validator
  req.checkBody('name', 'name mandatory').notEmpty()
  req.checkBody('email', 'email not valid').isEmail()
  req.checkBody('username', 'username mandatory').notEmpty()
  req.checkBody('password', 'password mandatory').notEmpty()

  var errors = req.validationErrors()
  console.log("errors are", errors)
  if (errors) {
    res.redirect('/signup?errors=true')
  } else {
    var newUser = new User({
      name,
      email,
      username,
      password,
      image
    })
    User.createUser(newUser, function (err, user) {
      if (err) throw err
      console.log(user)
    })
    // res.location('/') //What is this used for?
    res.redirect('/')
  }

})

router.post('/login',
  passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/' }),
  function (req, res, next) {
    console.log(req.body)
  })

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.getUserByUsername(username, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      User.comparePasswords(password, user.password, (err, isMatch) => {
        if (err) { return done(err) }
        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Invalid cred' })
        }
      })

    })
  }
));

module.exports = router;
