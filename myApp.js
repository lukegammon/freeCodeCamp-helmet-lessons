const express = require('express');
const app = express();
const helmet = require("helmet");

app.use(helmet.hidePoweredBy()); // Hides that your backend is express
app.use(helmet.frameguard({action: "DENY"})); // Stops your page fropm being used in an iframe(click hijacking)
app.use(helmet.xssFilter()); // basic protection from unwanted scripts being run(via input forms etc)
app.use(helmet.noSniff()); // MIME type Sniffing sets the X-Content-Type-Options to noSniff
app.use(helmet.ieNoOpen()) // sets the X-Download-Options header to noopen. This will prevent IE users from executing downloads in the trusted site’s context

const ninetyDaysInSeconds = 90*24*60*60;
app.use(helmet.hsts({maxAge: ninetyDaysInSeconds, force: true})) // force https for 90 days. protection against non secure(http) request
app.use(helmet.dnsPrefetchControl()); // stop DNS prefetching of records on page(links etc.)
app.use(helmet.noCache()); // always download the newer version of a page, noCache tries to disable caching on client’s browser. 

app.use(helmet.contentSecurityPolicy({directives: {defaultSrc: ["'self'"]}))














































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
