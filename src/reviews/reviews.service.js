const knex = require("../db/connection");

function list() {
    return knex("reviews as r")
    .select("*")
  }

  function read(reviewId){
    return knex("reviews")
      .select("*")
      .where("review_id", reviewId)
      .first()
  }

  function update(updatedReview) {
    return knex("reviews as r")
      .select("*")
      .where("review_id", updatedReview.review_id )
      .update(updatedReview)
      .then(()=>{
        return read(updatedReview.review_id)
      })
      .then((review)=>{
        return knex("critics")
          .select("*")
          .where("critic_id", review.critic_id)
          .first()
          .then(critic => {
            return {
              ...review, critic
            }
          })

      })

  }

  function destroy(review_id) {
    return knex("reviews").where("review_id", review_id).del();
  }
  

  module.exports = {
    list, read, update, destroy
  };

  