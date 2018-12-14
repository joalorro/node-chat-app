const moment = require('moment')
// Jan 1st 1970 00:00:00 am 
// 1000 => represents one second into the above time stamp

const timestamp = moment().valueOf()
console.log(timestamp);

const createdAt = 1234
const date = moment(createdAt)
console.log(date.format('h:mm a') )