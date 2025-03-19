const express = require("express");
const jwt = require("jsonwebtoken");
const log = require("tracer").colorConsole();
const url = require("url");
const hookcord = require('hookcord');
const bodyParser = require('body-parser');
//const {SCALEDRONE_CHANNEL, SCALEDRONE_SECRET, NODE_ENV} = process.env;
const PORT = process.env.PORT || 3000;
const SCALEDRONE_CHANNEL = process.env.SCALEDRONE_CHANNEL;
const SCALEDRONE_SECRET = process.env.SCALEDRONE_SECRET;
const NODE_ENV = process.env.NODE_ENV;

if (!SCALEDRONE_CHANNEL) {
  log.error("Please provide a SCALEDRONE_CHANNEL environmental variable");
  process.exit();
}
if (!SCALEDRONE_SECRET) {
  log.error("Please provide a SCALEDRONE_SECRET environmental variable");
  process.exit();
}

const app = express();
//app.set("view engine", "ejs"); // EJS is used to add channelID to the html file
app.use(express.static("public"));
console.log(SCALEDRONE_CHANNEL);
app.get("/", function (req, res) {
  res.render("index.html", { title: 'chat' });
});
app.get("/stone", function (req, res) {
  res.render("stone.html", { title: 'chat' });
});
app.get("/auth/:clientId", function (req, res) {
    const payload = {
      client: req.params.clientId,
      channel: SCALEDRONE_CHANNEL,
      permissions: {
        "^feed$": {
          publish: true,
          subscribe: true,
          history: 100,
        },
      },
      exp: Date.now() + 180000, // client can use this token for 3 minutes (UTC0)
    };
    const token = jwt.sign(payload, SCALEDRONE_SECRET, { algorithm: "HS256" });
    res.status(200).end(token);
});



/*app.use(bodyParser.urlencoded({ extended: true }));
const Hook = new hookcord.Hook();
Hook.login(
"1350129665112674354","_TYTLHGvu9RyWTrXegBxAtxMc4YQEsa65INgPHHLIZzJXs306Q8xrUT1RK13baUU_-7V",
);
app.get('/submit', (req, res) => {
    const userInput = req.body.userInput;
    console.log(userInput);
    Hook.setPayload({
      content: userInput,
    });
    Hook.fire()
    .then(response_object => {
    })
    .catch(error => {
      throw error;
    });
});*/
const bodparser = bodyParser.urlencoded({ extended: false })
app.post('/submit', bodparser, function (req, res){
  console.log("i got a request");
  console.log(req.body.message);
  const userInput = req.body.message;
  const Hook = new hookcord.Hook();
  Hook.login(
  "1350129665112674354","_TYTLHGvu9RyWTrXegBxAtxMc4YQEsa65INgPDHLlZzJXs306Q8xrUT1RK13baUU_-7V",
  );
  console.log(userInput);
  Hook.setPayload({
    content: userInput,
  });
  Hook.fire()
  .then(response_object => {
  })
  .catch(error => {
    throw error;
  });
});
app.post('/stone', bodparser, function (req, res){
  console.log("i got a request");
  console.log(req.body.message);
  const userInput = req.body.message;
  const Hook = new hookcord.Hook();
  Hook.login(
  "1351235590384783451","dZM2Q3VyiqWrEw68Yrziwm_sLTwoW37B86a7LCpz6qapEBy0YQiEGFlG9CHjRCX11Lq3",
  );
  console.log(userInput);
  Hook.setPayload({
    content: userInput,
  });
  Hook.fire()
  .then(response_object => {
  })
  .catch(error => {
    throw error;
  });
});
app.listen(PORT);
log.info(`Server is running on port ${PORT}. Visit http://localhost:${PORT}`);