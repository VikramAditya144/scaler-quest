
 const API_URL = "http://localhost:3000";
 var btn = document.getElementById('generateLinkBtn');
 console.log('button', btn);
 btn.addEventListener("click", function() {
     getQuestionName();
 });

 // Add event listener to the "Contribute" form
 document.getElementById("contributionForm").addEventListener("submit", function(event) {
     event.preventDefault();
     console.log(event);
     contributeQuestion();
 });

 function getQuestionName() {
     // Get the value of the "Question Name" input field and trim any leading or trailing white spaces
     var questionNameValue = document.getElementById("username").value.trim().toLowerCase();
    
     if (leetcode.hasOwnProperty(questionNameValue)) {
         chrome.tabs.create({ url: leetcode[questionNameValue] });
     } else {
         // Hide the "Ask Question" form
         document.getElementById("askQuestionForm").style.display = "none";

         // Display the "Contribution" form
         document.getElementById("contributionForm").style.display = "block";
     }
 }



 function contributeQuestion() {
     var contributionQuestionIdValue = document.getElementById("contributionQuestionId").value.trim();
     var contributionQuestionLinkValue = document.getElementById("contributionQuestionLink").value.trim();
     var contributorNameValue = document.getElementById("contributorName").value.trim();

     // Check if the contribution question ID already exists in the hashmap
     if (leetcode.hasOwnProperty(contributionQuestionIdValue)) {
         alert('Question ID already exists in the hashmap.');
         return;
     }

     // Add the contribution to the queue
     const questionObject = {
         questionId: contributionQuestionIdValue,
         questionLink: contributionQuestionLinkValue,
         contributorName: contributorNameValue,
     };

     fetch(API_URL + "/contribute",{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        //make sure to serialize your JSON body
        body: JSON.stringify(questionObject)
     }).then((res) => {
        return res.json();
     }).then((data) => {
        console.log("Contribution succes")
     });

     // Optionally, you can display a success message or update the UI
     alert('Contribution added to the queue.' + contributionQueue[0].questionId + ' ' + contributionQueue[0].questionLink + ' ' + contributionQueue[0].contributorName);


     // Hide the "Contribution" form after submission`
     document.getElementById("contributionForm").style.display = "none";

     // Show the "Ask Question" form again
     document.getElementById("askQuestionForm").style.display = "block";
}

