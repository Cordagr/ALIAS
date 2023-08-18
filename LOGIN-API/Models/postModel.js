var PostSchema = new Schema ({
Title: String, 
Content: String, 
Likes: var,
author: 
{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',

}
});
