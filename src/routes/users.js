const { Router } = require('express');
const { getAll } = require('../controllers/userController');

const router  = Router();

router.get('', getAll )


module.exports = router