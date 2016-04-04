﻿var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var passport = require('passport');
var bunyan = require('bunyan');

try {
    var app = express();
    app.set('views', './td/views');
    app.set('view engine', 'jade');

    //static content
    app.use('/public', express.static(path.join(__dirname, 'public')));

    //security headers
    require('./config/securityheaders.config')(app);

    //sessions
    require('./config/session.config')(app);

    //passport
    require('./config/passport.config')(app);

    //favicon
    app.use(favicon(__dirname + '/public/favicon.ico'));

    //logging
    require('./config/loggers.config')(app);

    //parsers
    require('./config/parsers.config')(app);

    //routes
    require('./config/routes.config')(app);

    bunyan.createLogger({ name: 'threatdragon' }).info('owasp threat dragon application started up');
}
catch (e) {
    var errorLogger = bunyan.createLogger({ name: 'threatdragon' });
    errorLogger.error('owasp threat dragon failed to start up');
    errorLogger.error(e.message);
}

module.exports = app;
