exports.initialize = function (db) {

    var Person = db.define("person", {
        firstname: String,
        lastname: String
    });

    exports.Person = Person;
};