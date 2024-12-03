const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middlewares/uploadMiddleware'); // Assuming a middleware to handle file upload

router.post('/users', upload.single('photo'), userController.createUser);


router.get('/users', userController.getAllUsers);


router.get('/users/:id', userController.getUserById);


router.put('/users/:id', upload.single('photo'), userController.updateUser);


router.delete('/users/:id', userController.deleteUser);

module.exports = router;
