exports.up = function (knex) {
    return knex.schema.createTable("reviews", (table) => {
      table.increments("review_id").primary();
      table.text("content");
      table.integer("critic_id").unsigned();
      table
        .foreign("critic_id")
        .references("critic_id")
        .inTable("critics")
        .onDelete("CASCADE");
      table.integer("movie_id");
      table
        .foreign("movie_id")
        .references("movie_id")
        .inTable("movies")
        .onDelete("CASCADE");
      table.integer("score");
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("reviews");
  };
  