const router = require("express").Router();
const { handleAuthorization } = require("../middlewares/auth");
const {
  getArticles,
  addArticle,
  removeArticle,
} = require("../controllers/articles");

// import validation midddleware for addArticle and removeArticle

router.get("/", handleAuthorization, getArticles);
router.post("/", handleAuthorization, // validateArticleBody, addArticle);
router.delete("/:articleId", handleAuthorization, // validateId, // removeArticle);

module.exports = router;
