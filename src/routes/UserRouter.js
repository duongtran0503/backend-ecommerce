const express = require('express');
const userController = require('./../controllers/UserController');
const router = express.Router();
const {
    authMiddleWare,
    authUserMiddleWare,
} = require('./../middleWare/authMiddleWare');
router.post('/newuser', userController.createUser);
router.post('/login', userController.userLogin);
router.put('/update/:id', authUserMiddleWare, userController.updateUser);
// Beare token
router.delete('/:id', authMiddleWare, userController.deleteUser);
router.get('/allUser', authMiddleWare, userController.getAllUser);
router.get('/:id', authUserMiddleWare, userController.getDetailsUser);
//default
router.get('/', (req, res) => {
    res.json({
        path: 'api/user',
    });
});
module.exports = router;
