
function pushUser(user)
{
let messages=[];
if(!user.username)
{
  messages.push("username does not exist!");
}

  if(!user.username && user.id.length>255)
{
    messages.push("username does not exist and id is too long!");
}
}

async function create(user)
{
  pushUser(user);
    const result = await db.query(
    'INSERT INTO quote (quote, author) VALUES (?, ?)', 
    [user.username,user.id]
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
