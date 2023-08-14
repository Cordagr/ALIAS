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
