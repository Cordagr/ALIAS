import {NextApiRequest, NextApiResponse}
import prisma from '@/libs/prismadb'

export default async function handler (
req:NextApiRequest
res:NextApiResponse
)
{
  if(req.method≠ 'Get')
  {
    return res.status.end(405);
  }
  try{const {userID}=req.query;
    if(!userID||typeof userID≠'string')
      {
        throw new Error ('Invalid ID');
      }
 const existingUser=await prisma.user.findUnique({
   where:{
    id:UserID
 }
 });                                      

const followersCount=await prisma.user.findUnique({
  where:{
     followingIds:
     {
       has:UserID
     }
  }
});
       
return req.status(200).json({...existingUser,followersCount});    



      
  
}catch(error)
  {
    console.log(error);
    return res.status(400).end;
  }

  
}
