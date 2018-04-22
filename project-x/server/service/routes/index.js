let express = require('express');
let router = express.Router();

/* GET home page. */
router.all('/', function(req, res, next) {
    res.redirect('http://localhost:8080/test/test-main.html');
});

module.exports = router;
