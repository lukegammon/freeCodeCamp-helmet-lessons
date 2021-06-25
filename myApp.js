const express = require('express');
const app = express();
const helmet = require("helmet");

app.use(helmet.hidePoweredBy()); // Hides that your backend is express
app.use(helmet.frameguard({action: "DENY"})); // Stops your page fropm being used in an iframe(click hijacking)
app.use(helmet.xssFilter()); // basic protection from unwanted scripts being run(via input forms etc)
app.use(helmet.noSniff()); // MIME type Sniffing sets the X-Content-Type-Options to noSniff














































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
