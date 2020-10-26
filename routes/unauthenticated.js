const express = require("express");
const router = express.Router();
let user = require("../api/users.js");

router.post("/registerHome", user.registerHome);
router.post("/registerUser", user.registerUser);
router.get("/verifyUser/:id/:code", user.verifyUser);
router.post("/homeLogin", user.homeLogin);
router.post("/userLogin", user.userLogin);
router.post("/forgotPass", user.forgotPass);
router.post("/forgotChangePass/:id", user.forgotChangePass);

module.exports = router;
