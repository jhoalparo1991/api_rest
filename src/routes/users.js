const { Router } = require('express');
const { getAll,createUser } = require('../controllers/userController');

const router  = Router();

router.get('', getAll )
router.post('', createUser )


module.exports = router