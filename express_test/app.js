var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var person = require("./models/person.js");
var connection = require("./models/connection.js");
var routes = require('./routes/api');
var index = require('./routes/index');
var orm = require("orm");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'person')));
app.use(express.static(path.join(__dirname, '/node_modules')));
app.use('/api', routes);
app.use('/', index);

orm.connect("sqlite://test.db", function (err, db) {
    !err && console.log("db connected!");
    if (err) throw err;
    person.initialize(db);
    connection.initialize(db);
    db.sync(function(err){
        !err && console.log("db synced!");
    });

    /*person.Person.get(1, function (err, person1) {
        if (!err) {
            person.Person.get(2, function (err, person2) {
                if (!err) {
                    connection.Connection.create({
                        cdate: new Date(),
                        duration: 0,
                        initperson_id: person1.id,
                        answerperson_id: person2.id
                    }, function (err, connection) {
                        if (!err) {
                            console.log("Created a connection");
                        } else {
                            console.log(err);
                        }
                    });
                } else {
                    console.log(err);
                }
            });
        } else {
            return console.log(err);
        }
    });*/

});

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;



