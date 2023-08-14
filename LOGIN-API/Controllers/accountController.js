// accountController.js
// Import user model
account = require('../models/accountModel');
// Handle index actions
exports.index = function (req, res) {
    account.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Accounts retrieved successfully",
            data: users
        });
    });
};
// Handle create user actions
exports.new = function (req, res) {
    var user = new account();
    user.username = req.body.username ? req.body.username : user.username;
    user.password = req.body.password ? req.body.password : user.password;
// save the user and check for errors
    user.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New user created!',
            data: user
        });
    });
};
