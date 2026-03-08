let allCard = [];


const manageSpinner = (status) =>{
  if (status == true){
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("issueCards").classList.remove("hidden");
  }
  else {
    document.getElementById("issueCards").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }

}


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
   manageSpinner(true);
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch (url);
    const data = await (res.json());
    allCard = data.data;
    removeActive();
    button.classList.add("active");
    displayIssueButton(allCard);
}

loadIssueButton();
 async function loadCardDetails(id){ 
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch (url);
    const data = await (res.json());
    displayCardModal(data.data);
}


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

displayCardModal =(cards) => {
   const modalCard = document.getElementById("my_modal_5");
   modalCard.innerHTML = 
    `
    <div class="modal-box m-10 space-y-4">
    <h1 class="text-2xl font-bold">${cards.title}</h1>
    <!-- status -->
    <div class=" flex gap-4 my-2">
      <button class="bg-[#00A96E] rounded-full px-3 py-1 text-white">${cards.status}</button>
      <p> Opened by ${cards.assignee}</p>
      <p>${cards.updatedAt}</p>
    </div>

    <!-- issue buttons -->
    <div>
       <button class=" py-2  rounded-lg">
        ${createElement(cards.labels)}
      </button>
       
     
    </div>

    <!-- description -->
     <div>
      <p class="text-[#64748B] ">The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.</p>
     </div>

     <!-- author -->
      <div class="bg-gray-50 py-2 px-4 rounded-md flex gap-x-40">
        <div>
          <p class="text-[#64748B]">Assignee:</p>
          <h1 class="font-bold">${cards.assignee}</h1>
        </div>
        <div>
          <p class="text-[#64748B]">Priority:</p>
          <button class="btn bg-red-200 text-[red] rounded-md">${cards.priority}</button>
        </div>
        
      </div>
        <!-- if there is a button in form, it will close the modal -->
       <form method="dialog">
        
        <button class="btn btn-primary ">Close</button>
      </form>
    </div>
    
    `
   document.getElementById("my_modal_5").showModal();


}




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
      <div id="issueCards"  onclick="loadCardDetails(${card.id})">
          <!-- cards -->
             <div  id="eachCard"  class="card space-y-4 bg-white p-4 shadow-xl ${cardBorder(card.status)}">
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
       manageSpinner(false);
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

document.getElementById("issueBtn").addEventListener("click" , () =>{
  const input = document.getElementById("searchInput");
  const inputValue = input.value.trim().toLowerCase();
  console.log(inputValue)
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then(res => res.json())
  .then((data) => {
    const allWord = data.data;
    const filterWords = allWord.filter((data) => data.title.toLowerCase().includes(inputValue));
    console.log(filterWords)
   displayIssueButton(filterWords);

  })
})
