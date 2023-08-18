//postController.js//
const querystring = require('querystring');
const request = require('request');

const link = 'http://your-website-link.com/sample.php';
let params = { 'A': 'a', 'B': 'b' };

params = querystring.stringify(params); // changing into querystring eg 'A=a&B=b'

request.post({
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // important to interect with PHP
  url: link,
  body: params,
}, function(error, response, body){
  console.log(body);
});
