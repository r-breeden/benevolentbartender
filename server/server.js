var express = require('express');
var axios = require('axios');


var app = express();

let port = process.env.PORT || 3000
app.use(express.static(__dirname + '/../src/client/public'));



app.listen(port, function() {
   console.log(`listening on port ${port}`);
});
