const USERID = 'homehackfebreze@gmail.com';
const SERVICE_ACCT_ID = 'scentsational@calendar-160608.iam.gserviceaccount.com';

var fs = require('fs');
const KEY = './json-googleapi-key';
var json = fs.readFileSync(KEY, 'utf8');
var key = JSON.parse(json).private_key;
module.exports.key = key;

const CALENDAR_URL = 'https://calendar.google.com/calendar/ical/homehackfebreze%40gmail.com/private-9db4b2a94cfa95bfeaeea896f5fa59f1/basic.ics';
var CALENDAR_ID = {
  'primary': ''
};

module.exports.calendarId = CALENDAR_ID;
module.exports.serviceAcctId = SERVICE_ACCT_ID;
module.exports.key = KEY;       //or if using json keys - module.exports.key = key;
module.exports.calendarUrl = CALENDAR_URL;
