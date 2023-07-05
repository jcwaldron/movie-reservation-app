const knex = require("../db/connection");

function list() {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select("m.*")
      .where("mt.is_showing", true)
      .groupBy("m.movie_id");
  }

function listTheatersForMovie(movieId){
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("t.*")
    .where("m.movie_id", movieId)
}

// listReviewsForMovie requires not only joined tables, but the addition of a new section for the critic's information.

function listReviewsForMovie(movieId) {
  return knex("reviews as r")
    .join("movies as m", "m.movie_id", "r.movie_id")
    .select("r.*")
    .where("r.movie_id", movieId)
    .then(reviews => {
      const criticIds = reviews.map(review => review.critic_id);
      return knex("critics")
        .select("*")
        .whereIn("critic_id", criticIds)
        .then(critics => {
          const criticMap = critics.reduce((map, critic) => {
            map[critic.critic_id] = critic;
            return map;
          }, {});

          const reviewsWithCritics = reviews.map(review => ({
            ...review,
            critic: criticMap[review.critic_id]
          }));

          return reviewsWithCritics;
        });
    });
}

  
function read(movieId) {
  return knex("movies")
    .select("*")
    .where("movie_id", movieId)
}

module.exports = {
    list, read, listTheatersForMovie, listReviewsForMovie
}