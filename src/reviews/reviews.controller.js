const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res){
    const data = await service.list();
    res.json({data})
}

async function read(req, res) {
    const { reviewId } = req.params;
    const data = await service.read(reviewId);
    const foundReview = data[0]
    res.json( foundReview );
  }

  async function reviewIdExists(req, res, next) {
    const { reviewId } = req.params;
    const foundReview = await service.read(reviewId);

    if (foundReview) {
      res.locals.review = foundReview;
      return next();
    }
  
    next({
      status: 404,
      message: `Review cannot be found.`,
    });
  }
  
  async function update(req, res, next) {
    const updatedReview = {
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };
    const data = await service.update(updatedReview);
    res.json({ data });
  } 
  

  function destroy(req, res, next) {
    const {review_id} = res.locals.review;
    service
      .destroy(review_id)
      .then(() => res.sendStatus(204))
      .catch(next);
  }

module.exports = {
    list,
    update: [asyncErrorBoundary(reviewIdExists), asyncErrorBoundary(update)],
    read: [reviewIdExists, read],
    destroy: [reviewIdExists, destroy]
}