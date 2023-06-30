const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.route("/")
    .all(cors())
    .get(controller.list)
    .all(methodNotAllowed);

router.route("/:movieId")
    .all(cors())
    .get(controller.read)
    .all(methodNotAllowed);

module.exports = router;