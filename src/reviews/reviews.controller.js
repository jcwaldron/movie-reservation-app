const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// lists all reviews for all movies
async function list(req, res){
    const data = await service.list();
    res.json({data})
}

// retrieves a single review
async function read(req, res) {
    const { reviewId } = req.params;
    const data = await service.read(reviewId);
    const foundReview = data[0]
    res.json( foundReview );
  }

// validates that a review exists in the database
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
  
// updates an existing review
  async function update(req, res, next) {
    const updatedReview = {
      ...req.body,
      review_id: res.locals.review.review_id,
    };
    const data = await service.update(updatedReview);
    res.json({ data });
  } 
  
// deletes an existing review
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