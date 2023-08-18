const request = require('request');

const options = {
    url: 'https://reqres.in/api/users',
    json: true,
    body: {
        name: 'Ja',
        job: 'Singer'
    }
};

request.post(options, (err, res, body) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Status: ${res.statusCode}`);
    console.log(body);
});
