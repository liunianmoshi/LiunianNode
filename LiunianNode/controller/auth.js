var authController = {};
var session = require('express-session');
var cookieParser = require('cookie-parser');

authController.index = function (req, res) {
    res.render('auth/index');
}


authController.login = function (req, res) {
    req.session.account = { "LoginName": "admin", "UserName":"王晓元"};
    res.redirect('/');
}

module.exports = authController;