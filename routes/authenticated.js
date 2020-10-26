const express = require("express");
const router = express.Router();
let user = require("../api/users.js");

router.get("/approveUsers/:email", user.approveUsers);
router.get("/pendingUsers/:homeId", user.pendingUsers);
router.get("/declineUsers/:homeId/:userId", user.declineUsers);

module.exports = router;
