const Mongoose = require("mongoose")
const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  role: {
    type: String,
    default: "Basic",
    required: true,
  },
   posts: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
        }
    ] 
},

        profileImage: {
        type: String,
        required: false,
        max: 255
    },


                                       
})
const User = Mongoose.model("user", UserSchema)
module.exports = User
