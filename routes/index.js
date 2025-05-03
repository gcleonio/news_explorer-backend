const router = require("express").Router();
const userRouter = require("./users");
const articleRouter = require("./articles");
const { loginUser, createUser } = require("../controllers/users");
const {
  validateCreateUser,
  validateLoginUser,
} = require("../middlewares/validation");

const NotFoundError = require("../utils/errors/NotFound");

router.use("/users", userRouter);
router.use("/articles", articleRouter);

router.post("/signup", validateCreateUser, createUser);
router.post("/signin", validateLoginUser, loginUser);

router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

module.exports = router;
