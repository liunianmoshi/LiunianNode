/**
 * Module dependencies.
 */

var express = require('express');
//var route = require('express-route-tree');
var route = require('./config/route');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var app = express();

var viewhelp = require('./common/viewhelper');

app.locals.formatTime = viewhelp.formatTime;
app.locals.dropMenuList = viewhelp.dropMenuList;

global.cache = "123";


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.use(route(__dirname + '/controller'));

http.createServer(app).listen(app.get('port'));
