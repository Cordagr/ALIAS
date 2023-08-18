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
    //create a unique USER_ID and then store onto DB//
    const uid=function()
        {
            Date.now().toString(36) + Math.random().toString(36).substring(2, 12).padStart(12, 0);
        }
    user.id=uid; 
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
// Handles viewing user information
exports.view = function (req, res) {
    account.findById(req.params.account_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'Account details loading..',
            data: user
        });
    });
};
// Handle update user info
exports.update = function (req, res) {
account.findById(req.params.account_id, function (err, user) {
        if (err)
            res.send(err);
            user.username = req.body.username ? req.body.username : user.username;
            user.password = req.body.password ? req.body.password : user.password;
// save the user and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Account Info updated',
                data: user
            });
        });
    });
};
// Handle delete user
exports.delete = function (req, res) {
    account.remove({
        _id: req.params.account_id
    }, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Account deleted'
        });
    });
};
