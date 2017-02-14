var PATH_DEFAULT = 'index';

function authority(req, res, next) {
    var pathArr = req.path.substring(1).split('/');
    var controllerName = pathArr.shift() || PATH_DEFAULT;
    var actionName = pathArr.shift() || PATH_DEFAULT;
    if (controllerName != "auth") {
        if (req.session.account) {


            next();
        } else {
            res.send("<script>top.location.href='/auth/index'</script>");
            return;
        }
    } else {
        next();
    }
}


function hasAuthen(controllerName, actionName,roleId) {
    var result = false;
    if (controllerName == "home" && actionName == "index") {
        return true;
    }

    if (roleId) {

    }
    return result;
}
module.exports = authority;