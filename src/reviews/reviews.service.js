const knex = require("../db/connection");

// lists all reviews
function list() {
    return knex("reviews as r")
    .select("*")
  }

// reads a single review
  function read(reviewId){
    return knex("reviews")
      .select("*")
      .where("review_id", reviewId)
      .first()
  }

// updates an existing review
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

// deletes an existing review
  function destroy(review_id) {
    return knex("reviews").where("review_id", review_id).del();
  }
  

  module.exports = {
    list, read, update, destroy
  };

  