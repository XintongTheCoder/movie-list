const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000 || process.env.PORT;
const Movie = require("../db").Movie;

app.use(express.static("client/dist"));
app.use(cors());

app.get("/api/movies", (req, res) => {
  Movie.findAll()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.sendStatus(500));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
