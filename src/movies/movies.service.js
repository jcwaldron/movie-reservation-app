const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

/* const addCritic = reduceProperties("movie_id", {
  critic_id: ["critic", null, "critic_id"],
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  organization_name: ["critic", null, "organization_name"],
  created_at: ["critic", null, "created_at"],
  updated_at: ["critic", null, "updated_at"]
}); */

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