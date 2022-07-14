const { Router } = require('express');
const { getAll,createUser,getById,updateUser,deleteUser } = require('../controllers/userController');

const router  = Router();

router.get('', getAll )
router.post('', createUser )
router.get('/:id', getById )
router.put('/:id', updateUser )
router.delete('/:id', deleteUser )


module.exports = router