const express = require("express");
const router = express.Router();
const menuController = require('../controller/menuController');
const {itemValidationRules, itemUpdateValidationRules} = require('../middlewares/itemsValidation');
const { valdationResults } = require("../middlewares/validationResult");



router.get('/', menuController.getAllItems);

router.post('/add-item', itemValidationRules, valdationResults, menuController.add);

router.put('/edit-item',itemUpdateValidationRules, valdationResults, menuController.edit)

router.delete('/delete-item', menuController.delete)








module.exports = router