exports.up = function (knex) {
    return knex.schema.createTable("movies_theaters", (table) => {
      table.integer("movie_id").unsigned();
      table.foreign("movie_id").references("movies.movie_id").onDelete("CASCADE");
  
      table.integer("theater_id").unsigned();
      table.foreign("theater_id").references("theaters.theater_id").onDelete("CASCADE");
  
      table.boolean("is_showing");
    });
  };

  exports.down = function (knex) {
    return knex.schema.dropTable("movies_theaters");
  };
  
