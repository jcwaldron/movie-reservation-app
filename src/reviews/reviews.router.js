const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.route("/")
    .all(cors())
    .get(controller.list)
    .all(methodNotAllowed);

router.route("/:reviewId")
    .all(cors())
    .get(controller.read)
    .put(controller.update)
    .delete(controller.destroy)
    .all(methodNotAllowed);


module.exports = router;