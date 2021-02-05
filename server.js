// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// My code is below this line 
app.get("/api/timestamp/", (req,res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  });
});

app.get("/api/timestamp/:date", (req,res) => {
  let date = req.params.date.length==parseInt(req.params.date).toString().length?parseInt(req.params.date):Date.parse(req.params.date);
  res.json(isNaN(date)?{error:"Invalid Date"}:{unix:date,utc:new Date(date).toUTCString()});
});
// My code is above this line


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
