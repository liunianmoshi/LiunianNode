function authority(req, res, next) {
    var pathArr = req.path.substring(1).split('/');
    console.info(pathArr);
    console.info(req.session);
    if (pathArr[0] != "auth") {
        if (req.session.account) {
            next();
        } else {
            res.redirect('/auth/index');
        }
    } else {
        next();
    }
}

module.exports = authority;