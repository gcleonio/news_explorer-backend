const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");
const { handleAuthorization } = require("../middlewares/auth");

router.get("/me", handleAuthorization, getCurrentUser);

module.exports = router;
