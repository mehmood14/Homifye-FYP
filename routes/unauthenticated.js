const express = require("express");
const router = express.Router();
let user = require("../api/users.js");

router.post("/registerHome", user.registerHome);
router.post("/registerUser", user.registerUser);
router.get("/verifyUser/:id/:code", user.verifyUser);
router.post("/homeLogin", user.homeLogin);
router.post("/userLogin", user.userLogin);

module.exports = router;
