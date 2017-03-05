var express = require('express')
var app = express()
var path = __dirname + "/public";

app.use(express.static(path));

app.get('/', function (req, res) {
    res.sendFile(path + "/index.html");
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/lights', function(){

  var http = require("https");

  var options = {
    "method": "PUT",
    "hostname": "na-hackathon-api.arrayent.io",
    "port": "443",
    "path": "/v3/devices/33554441",
    "headers": {
      "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiI2MDU5ZTExMC0wMTFhLTExZTctOTIwNy1iNWMzYjY2M2Y2YTQiLCJlbnZpcm9ubWVudF9pZCI6Ijk0OGUyY2YwLWZkNTItMTFlNi1hZTQ2LTVmYzI0MDQyYTg1MyIsInVzZXJfaWQiOiI5MDAwMDg0Iiwic2NvcGVzIjoie30iLCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwiaWF0IjoxNDg4NjYzMzM0LCJleHAiOjE0ODk4NzI5MzR9.nJGTrEkQzNdx4f8FyMXkH3I7g7vh1AQ-cldkOv6HC_0JFjl3MC74vFgzk-wuSYw2r1MuYwI_uEbnKiDDTb65Fw",
      "content-type": "application/json",
      "cache-control": "no-cache",
      "postman-token": "8d9044a1-60f3-0fb3-53dc-bfb9c4c5616e"
    }
  };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    req.write(JSON.stringify([ { DeviceAction: 'led_mode=1' },
      { DeviceAction: 'led_color=0,9,4,4,4' } ]));

    req.end();

})
