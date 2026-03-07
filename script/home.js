let allCard = [];

const createElement = (arr) => {
    const htmlElement = arr.map((el)=>
    `
    <span class =  "bg-[#BBF7D0] text-[#00A96E] border-[#00A96E] btn rounded-xl" > ${el} </span>
    `)
    return (htmlElement.join(" "));
    
}
const removeActive = () => {
  const buttons = document.querySelectorAll(".show");
  buttons.forEach((btn) => btn.classList.remove("active"));
}
 async function loadIssueButton(button){ 
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch (url);
    const data = await (res.json());
    allCard = data.data;
    removeActive();
    button.classList.add("active");
    displayIssueButton(allCard)
}
loadIssueButton();

// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"


const priorityColor = {
  high: "bg-red-100  text-red-600 font-bold",
  medium: "bg-[#D97706]/20 text-[#D97706] border-[#D97706] font-bold",
  low:  "bg-gray-100 text-black border-black font-bold "

};

const  cardBorder = (status) => {
  if (status === "open"){
    return "border-t-[7px] border-solid border-[#00A96E]";
  }
  else if (status === "closed"){
    return "border-t-[7px] border-solid border-[#A855F7]"
  }

}



function displayIssueButton (cards){
   const issueCardContainer = document.getElementById("issueCards");
    console.log(issueCardContainer)
    issueCardContainer.innerHTML = "";
    for (let card of cards){
        console.log(card);

       const issueCard = document.createElement("div");
        issueCard.innerHTML = `
        <!-- cards -->
      <div id="issueCards" >
          <!-- cards -->
             <div id="eachCard"  class="card space-y-4 bg-white p-4 shadow-xl ${cardBorder(card.status)}">
          <!-- top -->
              <div  class=" flex justify-between p-4 ">
            <button class="${priorityColor[card.priority]} py-2 px-8 rounded-lg ">${card.priority}</button>
              </div>
           <!-- middle -->
             <div class="space-y-4">
            <h1 class="text-xl font-bold text-[#1F2937]">${card.title}</h1>
            <p class=" text-[#1F2937] line-clamp-2">${card.description}</p>
             <div class="inner-butt">
              <button class=""> ${createElement(card.labels)}</button>  
               
             </div>
          </div>
           <!-- end -->
               <div class="text-xl text-[#1F2937] space-y-2">
              <p><span>#${card.id}</span> by <span>${card.assignee ? card.assignee : 'No name found' }</span></p>
              <p>${new Date(card.createdAt).getMonth()+1}/${new Date(card.createdAt).getDate()}/${new Date(card.createdAt).getFullYear()}</p>
              </div>
        </div>
      </div>
        `
       issueCardContainer.append(issueCard) ;
    }

}



function showOpenCard (button) {
  const openCard = allCard.filter(data => data.status =="open");
   removeActive();
  button.classList.add("active");
  cardBorder();
  
  displayIssueButton(openCard);
 
}

function showClosedCard(button){
  const closeCard = allCard.filter (data => data.status === "closed");
  removeActive();
  button.classList.add("active");
  cardBorder();
  displayIssueButton(closeCard);
 

}
