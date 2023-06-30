const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res){
    const data = await service.list();
    res.json({data})
}

async function read(req, res) {
    const { reviewId } = req.params;
    const data = await service.read(reviewId);
    res.json({ data });
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
      message: `id not found: ${req.params.reviewId}`,
    });
  }

  async function update(req, res, next) {
    const { reviewId } = req.params;
    const updatedReview = {
      ...req.body.data,
      review_id: reviewId
    };
  
    try {
      const data = await service.update(updatedReview);
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
  
  
  

module.exports = {
    list,
    update: [asyncErrorBoundary(reviewIdExists), asyncErrorBoundary(update)],
    read,
}