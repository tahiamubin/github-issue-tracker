console.log("home file is connected");

function loadIssueButton(){

    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
    .then(res => res.json())
    .then(json => displayIssueButton(json.data))
    
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

function displayIssueButton (cards){
    const issueCardContainer = document.getElementById("issueCards");
    console.log(issueCardContainer)
    issueCardContainer.innerHTML = "";
    for (let card of cards){
        console.log(card);

       const issueCard = document.createElement("div");
        issueCard.innerHTML = `
        <div class="grid grid-row-4 gap-3">
        <!-- cards -->
        <div id="issueCards" class="card space-y-4 bg-white">
          <!-- top -->
          <div class=" flex justify-between p-4 ">
            <img src="assets/Open-Status.png" alt="">
            <button class="bg-red-100 py-2 px-8 rounded-lg  text-red-600 ">${card.priority}</button>
          </div>
           <!-- middle -->
          <div class="space-y-4">
            <h1 class="text-xl font-bold text-[#1F2937]">${card.title}</h1>
            <p class=" text-[#1F2937] line-clamp-2">${card.description}</p>
             <div class="inner-butt">
              <button class="bg-red-100 py-2 px-8 rounded-lg  text-red-600 "> <i class="fa-solid fa-bug"></i> Bug</button>  
              <button class="bg-[#D97706]/20 py-2 px-8 rounded-lg  text-[#D97706] "> <i class="fa-solid fa-life-ring"></i> Help Wanted</button>
             </div>
          </div>
           <!-- end -->
            <div class="text-xl text-[#1F2937]">
              <p><span>#${card.id}</span> by <span>${card.assignee}}</span></p>
              <p>${new Date(card.createdAt).getMonth()+1}/${new Date(card.createdAt).getDate()}/${new Date(card.createdAt).getFullYear()}</p>
            </div>
        </div>

      </div>
        `
       issueCardContainer.append(issueCard) ;
    }

}