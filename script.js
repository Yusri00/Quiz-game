let questions = []; 

async function fetchData(){

    try{
        const response = await fetch('data.JSON');
        if(!response.ok){
            throw new Error(`Http error! status: ${response.status}`);
        }
        questions = await response.json();
        showQuestion();

        // To show data in HTML         
        const dataDisplay = document.getElementById('dataDisplay');
        dataDisplay.textContent = JSON.stringify(questions, null, 2);
    }
    catch(error){
        console.error('API could not be read', error);
    }
}
fetchData();

const root = document.getElementById("root");
let currentQuestionIndex = 0; // Track the current question
let score = 0; // Track the user's score
let timer; // Store the timer so it can be cleared


function showQuestion (){
    const currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestion); 
    const options = currentQuestion.options;
    console.log(options[0]);
    dataDisplay.innerHTML = "";

}

