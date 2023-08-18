const request = require('request');

const options = {
    url: 'https://reqres.in/api/users',
    json: true,
    body: {
        name: 'John Doe',
        job: 'Content Writer'
    }
};

request.post(options, (err, res, body) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Status: ${res.statusCode}`);
    console.log(body);
});
