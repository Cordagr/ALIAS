var PostSchema = new Schema ({
Title: String, 
Content: String, 
author: 
{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',

}
});
