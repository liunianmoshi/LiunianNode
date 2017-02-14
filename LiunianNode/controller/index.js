
/*
 * GET home page.
 */

exports.index = function (req, res) {
    var userInfo = req.session.account;
    res.render('index/index', { UserInfo: userInfo });
};