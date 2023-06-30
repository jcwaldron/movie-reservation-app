if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const moviesRouter = require("./movies/movies.router");
const app = express();
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

app.use(cors())
app.use(express.json());

app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);
app.use("/movies", moviesRouter);
app.use(notFound);
app.use(errorHandler);




module.exports = app;
