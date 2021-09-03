const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/xkcd/:id", (req, res) => {
  fetch(`http://xkcd.com/${req.params.id}/info.0.json`)
    .then((result) => result.json())
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send());
});

app.get("/xkcd", (req, res) => {
  fetch("http://xkcd.com/info.0.json")
    .then((result) => result.json())
    .then((result) => res.json(result));
});

app.post("/reverse", (req, res) => {
  let { message } = req.body;
  if (!message) {
    message = "Im missing the message item from the form"
      .split("")
      .reverse()
      .join("");
  }
  res.json({
    message: message.split("").reverse().join(""),
    comicId: 32,
  });
});

app.post("/echo", (req, res) => {
  res.status(404).json({ error: "nåt gick fel" });
  //res.json(req.body);
});
app.get("/rnm/:s", (req, res) => {
  fetch(`https://rickandmortyapi.com/api/character/?name=${req.params.s}`)
    .then((result) => result.json())
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send());
});
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
