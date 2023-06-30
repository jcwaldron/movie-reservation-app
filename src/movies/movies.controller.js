const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res){
    const data = await service.list();
    res.json({data})
}

async function listTheatersForMovie(req, res){
  const {movieId} = req.params;
  const data = await service.listTheatersForMovie(movieId);
  res.json({data})
}

async function listReviewsForMovie(req, res){
  const {movieId} = req.params;
  const data = await service.listReviewsForMovie(movieId);
  res.json({data})
}


async function read(req, res, next){
    const { movieId } = req.params;
    const [data] = await service.read(movieId);
    res.json({data});
}

async function movieIdExists(req, res, next) {
    const { movieId } = req.params;
    const foundMovie = await service.read(movieId);
  
    if (foundMovie.length) {
      res.locals.movie = foundMovie;
      return next();
    }
  
    next({
      status: 404,
      message: `/cannot be found/i`,
    });
  }

module.exports = {
    list: asyncErrorBoundary(list),
    read: [movieIdExists, read],
    listTheatersForMovie: [movieIdExists, listTheatersForMovie],
    listReviewsForMovie: [movieIdExists, listReviewsForMovie]
}