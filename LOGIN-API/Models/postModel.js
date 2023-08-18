var PostSchema = new Schema ({
Title: String, 
Content: String, 
Likes: var,
post_id: String;
author: 
{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',

}
});
