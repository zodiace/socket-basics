var moment = require('moment');
var now = moment();

console.log(now.format());
console.log(now.format('x'));

now.subtract(1, 'year');

console.log(now.format('MMM DDDo YYYY, h:mma'));

console.log(now.format('h:mma'));

var timestamp = 1452258420200;
var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format());