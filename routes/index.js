var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var User = require('../models/user');
// var csrfProtection = require('csurf');;
// router.use(csrfProtection());
/* GET home page. */
router.get('/', function (req, res, next) {
  //phương thức lấy dữ liệu từ API trực tiếp
  Product.find((err, data) => {
    res.render('shop/categorypage', { title: 'Shopping cart', products: data });
  });
});

router.get('/user/signup', (req, res, next) => {
  // {csrfToken:req.csrfToken()}
  res.render('user/signup');
});

router.post('/user/signup', (req, res, next) => {
  // res.redirect ('/');
  // res.render('user/signup');
  var newUser = new User();
  newUser.email = req.body.email;
  newUser.password = req.body.password;
  User.findOne(
    {
      email: newUser.email
    }
  )
    .exec((err, tasks) => {
      if (err) res.status(400).send('err');
      else {
        if (tasks) {
          res.render('user/signup', { data: newUser.email + " : This Email have been signup !" });
        } else {
          newUser.save((err, task) => {
            if (err) res.status(400).send('err');
            else {
              // res.send('<h3>Đăng kí thành công</h3>');
              console.log("Đăng kí thành công")
              res.redirect ('/');
            }
          })
        }
      }
    });
})
module.exports = router;
