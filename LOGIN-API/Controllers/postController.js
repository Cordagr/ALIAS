// Import user model
blog = require('../models/postModel');
// Handle index actions
exports.index = function (req, res) {
    post.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Posts retrieved successfully",
            data: users
        });
    });
};
// Handle create user actions
exports.new = function (req, res) {
    var user = new post();
    user.username = req.body.username ? req.body.username : user.username;
    user.content = req.body.content;
    user.pfp=req.body.pfp;
// save the user and check for errors
    user.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New post created!',
            data: user
        });
    });
};

