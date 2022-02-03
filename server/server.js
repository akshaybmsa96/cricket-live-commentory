const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { commentarySSE, addCommentary } = require("./commentarySSE");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/test", (request, response) =>
  response.send("Sever Runnning OK, Tested")
);

app.get("/commentary", commentarySSE);
app.post("/addCommentary", addCommentary);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`);
});
