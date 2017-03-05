var express = require('express')
var bodyParser = require('body-parser');
var app = express()
var path = __dirname + "/public";
var gsjson = require('google-spreadsheet-to-json');

app.use(express.static(path));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.sendFile(path + "/index.html");
})

app.get('/json', function(){
  // GET /v4/spreadsheets/1NTY5ToSoIQCkZDceQ5RLVdaKP74TzE30tp729rfrYn8/values/Sheet1!A1:D5 HTTP/1.1
  // Host: sheets.googleapis.com
  // Content-length: 0
  // Authorization: Bearer ya29.GlsFBAvgyayvi8dgNNL32oQoExXN6smi4DFk69sv21mRU2DS2wVMBjK70tG94cR2VMOAxgP-YhQ8v5BpRYEUiW_NaICb7KAJ5zvdzYFHbWRBh45cuIu9hcENeq6b
  // HTTP/1.1 200 OK
  // Content-length: 132
  // X-xss-protection: 1; mode=block
  // Content-location: https://sheets.googleapis.com/v4/spreadsheets/1NTY5ToSoIQCkZDceQ5RLVdaKP74TzE30tp729rfrYn8/values/Sheet1!A1:D5
  // X-goog-trace-id: 96b86a7e046a6f2ed2841928df643dc8
  // Transfer-encoding: chunked
  // Vary: Origin, X-Origin, Referer
  // Server: ESF
  // -content-encoding: gzip
  // Cache-control: private
  // Date: Sun, 05 Mar 2017 12:26:53 GMT
  // X-frame-options: SAMEORIGIN
  // Alt-svc: quic=":443"; ma=2592000; v="36,35,34"
  // Content-type: application/json; charset=UTF-8
  // {
  //   "range": "Sheet1!A1:D5",
  //   "values": [
  //     [
  //       "bantha"
  //     ],
  //     [
  //       "fodder"
  //     ]
  //   ],
  //   "majorDimension": "ROWS"
  // }
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/lights', function(req, res){
  var lightNum = req.query.num;

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
      { DeviceAction: 'led_color=0,' + lightNum + ',4,4,4' } ]));

    req.end();

})
