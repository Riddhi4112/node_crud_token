const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser"); 
const jsonParser = bodyParser.json();
const controller = require("../../controllers/userControllers")

router.post("/add-users", jsonParser, controller.addUserData);
router.get("/get-users", jsonParser, controller.getUserData);
router.delete("/delete-users/:id", jsonParser, controller.deleteUserData);
router.put("/update-users/:id", jsonParser, controller.updateUserData);

module.exports = router