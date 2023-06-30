const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const addCritic = reduceProperties("critic_id", {
  critic_id: ["critic", null, "critic_id"],
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  organization_name: ["critic", null, "organization_name"],
  created_at: ["critic", null, "created_at"],
  updated_at: ["critic", null, "updated_at"]
})

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
 /*        return knex("reviews as r")
          .join("critics as c", "r.critic_id", "c.critic_id")
          .select("*")
          .where("r.review_id", updatedReview.review_id) 
          .then(data => addCritic(data, null))*/

      })

  }

  function destroy(review_id) {
    return knex("reviews").where("review_id", review_id).del();
  }
  

  module.exports = {
    list, read, update, destroy
  };

  