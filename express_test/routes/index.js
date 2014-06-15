var express = require('express');
var router = express.Router();

/* GET index listing. */
router.get('/', function (req, res) {
    return res.render("index", { title: "ExpressDemo"}, function (err, html) {
        if (err) {
            console.log(err)
            return res.send(err);
        } else {
            return res.send(html);
        }
    })
});

router.get('/person_list', function (req, res) {
    return res.render("person_list", { title: "ExpressDemo"}, function (err, html) {
        if (err) {
            console.log(err)
            return res.send(err);
        } else {
            return res.send(html);
        }
    })
});

router.get('/create_person', function (req, res) {
    return res.render("create_person", { title: "ExpressDemo"}, function (err, html) {
        if (err) {
            console.log(err)
            return res.send(err);
        } else {
            return res.send(html);
        }
    })
});

module.exports = router;
