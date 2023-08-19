function updateLikes(user,post)
{
let messages=[];
if(!user.username)
{
  messages.push("username does not exist!");
}

if(!post)
{
  messages.push("post does not exist!");
}
}


async function change(user,post)
{
    updateLikes(user,post);
    const result = await db.query(
     //Update likes//
  START TRANSACTION;
  DELETE FROM video_likes WHERE PRIMARY KEY(video_id, user_id)= '$post_id';
  UPDATE videos SET like_ct = like_ct - 1 WHERE ...;
  COMMIT;
  );

  let message = 'Error in creating quote';

  if (result.affectedRows) {
    message = 'User created successfully!';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create
}

}
