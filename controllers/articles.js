const Article = require("../models/article");
const InvalidError = require("../utils/errors/InvalidError");
const NotFoundError = require("../utils/errors/NotFound");
const ForbiddenError = require("../utils/errors/ForbiddenError");
const {
  INVALID_CREDENTIALS,
  ARTICLE_NOT_FOUND,
  NOT_OWNER,
} = require("../utils/constants");

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      res.send(articles);
    })
    .catch((err) => {
      next(err);
    });
};

const addArticle = (req, res, next) => {
  const owner = req.user._id;
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then((article) => {
      console.log(article);
      res.send({ data: article });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new InvalidError(INVALID_CREDENTIALS));
      }
      next(err);
    });
};

const removeArticle = (req, res, next) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  Article.findById(articleId)
    .select("+owner")
    .orFail(() => new NotFoundError(ARTICLE_NOT_FOUND))
    .then((article) => {
      if (userId !== article.owner.toString()) {
        throw new ForbiddenError(NOT_OWNER);
      }
      return Article.findByIdAndRemove(articleId)
        .orFail(() => new NotFoundError(ARTICLE_NOT_FOUND))
        .then((removedArticle) => res.send(removedArticle))
        .catch(next);
    })
    .catch(next);
};

module.exports = { getArticles, addArticle, removeArticle };
