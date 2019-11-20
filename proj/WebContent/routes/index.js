var express =  require('express');
var router = express.Router();

let index = require('../controllers/index');
router.get('/', home.get_search);

module.exports = router;