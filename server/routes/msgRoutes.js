const { addMessage, getMessage } = require("../controller/messagesController");

const router = require("express").Router();

router.post("/addMsg",addMessage);
router.post("/getMsg",getMessage);

module.exports = router;