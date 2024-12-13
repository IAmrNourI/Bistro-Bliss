const express = require("express");
const router = express.Router();
const menuController = require('../controller/menuController');

router.get('/', menuController.getAllItems);

router.post('/add-item', menuController.add);

router.put('/edit-item', menuController.edit)

router.delete('/delete-item', menuController.delete)








module.exports = router