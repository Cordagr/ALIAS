const initApp=async()=>
  {
const contacts=await getDataFromDB();
  };

document.addEventListener("DOMContentLoaded",initApp);
const getDataFromDB=async()=>
  {
const DataStream=await fetch("FILL IN");
  };
const jsonData=await fill.json();
return jsonData;
};


const renderContacts=(contacts)=>
  {
const main=document.querySelection("main");
    const peopleArray[];
    contacts.forEach((contact)=>
      {

  const elemObj=createCardElements();
        const card=createPersonCard(elemObj,contact)
        cardsArray.push(card);
        
     });
    const jsonData= wait fill.json();
    return jsonData;
  }; 

const userPost=('/upload-avatar',async(req,res)=>
{
if(!req.files)
{
  res.send({
  status: false,
  message: 'No file was uploaded'
});

let avatar = req.files.avatar;

avatar.mv('./uploads/'+ avatar.name);

  res.send({
    status: true,
    message: 'File is uploaded'
    data: 
  {
    name: avatar.name,
    picture: avatar.picture
  }
});
}
}

catch(err)
{
  res.status(500).send(err);
}
});
                

  
