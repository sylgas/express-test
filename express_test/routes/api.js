var express = require('express');
var connection = require("../models/connection.js");
var person = require("../models/person.js");
var router = express.Router();

router.get('/person/:id/connections', function (req, res) {
    connection.Connection.find({initperson_id: req.params.id}, function (err, connections) {
        if (!err) {
            connection.Connection.find({answerperson_id: req.params.id}, function (err, connections2) {
                if (!err) {
                    return res.send(connections.concat(connections2));
                } else {
                    console.log(err);
                    return res.send(err);
                }
            })
        } else {
            console.log(err);
            return res.send(err);
        }
    })
});

router.get('/person/:id', function (req, res) {
    return person.Person.get(req.params.id, function (err, person) {
        if (!err) {
            return res.send(person);
        } else {
            console.log(err);
            return res.send(err);
        }
    });
});

router.get('/person', function (req, res) {
    return person.Person.find(function (err, persons) {
        if (!err) {
            return res.send(persons);
        } else {
            return res.send(err);
        }
    });
});

router.post('/person/create', function (req, res) {
    console.log("POST: ");
    console.log(req.body);
    person.Person.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }, function (err, finded) {
        if (!err) {
            console.log("Created a person");
            return res.send(finded);
        } else {
            return res.send(err);
        }
    });
});

router.delete('/person/:id/delete', function (req, res) {
    console.log("DELETING: ");
    console.log(req.params.id);
    person.Person.get(req.params.id, function (err, finded) {
        if (!err) {
            console.log("Trying to remove");
            return finded.remove(function (err) {
                if (!err) {
                    console.log("Removed a person");
                    return res.send(finded);
                } else {
                    console.log("Could not remove a person")
                    return res.send(err);
                }
            });
        } else {
            console.log("ERROR");
            return res.send(err);
        }
    });
});

module.exports = router;
