const initApp=async()=>
  {
    //get json data from db
    const contacts=await getDataFromDB();
    //renders data to page
    //add listeners
  };



document.addEventListener("DOMContentLoaded",initApp);
const getDataFromDB=async()=>
  {
    const DataStream=await fetch
      ("fill in");
  };
const jsonData=await fill.json();
return json.data;
};



const renderContacts=(contacts)=>
  {
    const main=document.querySelector("main");
    //add actual data base eventually//
    const peopleArray[];
    contacts.forEach((contact)=>
    {
      const elemObj=createCardElements();
      const card=createPersonCard(elemObj,contact);
      cardsArray.push(card);
      //push person into array//
    });
     cardsArray.forEach((card)=>
       {
         main.appendChild(card);
       });
  };
  


const createCardElements=()=>
    {
      const article=document.createElement("article");
      const img=document.createElement("img");
      const details=document.createElement("div");
      const like=details=document.createElement("div");
      const name=document.createElement("h2");
      const email=document.createElement("p");
      return {img,details,like,name,email};
    };
     

       const createPersonCard=(elemObj,person)=>
       {
      const {article,img,details,like,name,email}=elemObj;
      details.className="details";
      like.classList.add("like","like-no");
      name.textContent='${person.firstname} ${person.lastname}';

      img.src=person.image;
      email.textContent=person.email;

      article.appendChild(img);
      details.appendChild(name);
      details.appendChild(email);
      article.appendChild(details);
      article.appendChild(like);
      return article;
      };
   const listenForLikes=()=>
     {
       const likes=document.querySelectorAll(".like");
       likes.forEach(like=>
         {
           like.addEventListener("click",(event=>
             {
               event.target.classList.toggle("like-no");
               event.target.classList.toggle("like-yes");
               if(event.target.classList.contains("like-yes"))
               {
                 console.log("Saving Favorite...");
                 getFaveData(event.target);
               }else
               {
                 console.log("Removing Favorite...");
                 getFaveData(event.target);
             }
         })
         }

         const getFaveData=(elem)=>
         {
           const parent=elem.parentElement;
           const img=parent.querySelector("img").src;
           const name=parent.querySelector("h2").textContent;
           const email=parent.querySelector("p").textContent;
           const[firstName,lastName]=name.split(" ");
           cosnt faveObj={img,firstName,lastName,email};
           console.log(faveObj);
                     
  }
