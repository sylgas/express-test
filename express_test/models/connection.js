var person = require("../models/person.js");

exports.initialize = function (db) {

    var Connection = db.define("connection", {
            duration: Number,
            cdate: Date
        }
    );
    Connection.hasOne("initperson", person.Person);
    Connection.hasOne("answerperson", person.Person);

    exports.Connection = Connection;

};