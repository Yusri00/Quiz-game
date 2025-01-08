let questions = [];

async function fetchData() {
  try {
    const response = await fetch("data.JSON");
    if (!response.ok) {
      throw new Error(`Http error! status: ${response.status}`);
    }
    questions = await response.json();
    showQuestion();
  } catch (error) {
    console.error("API could not be read", error);
  }
}
fetchData();


const root = document.getElementById("root");
let currentQuestionIndex = 0; // Track the current question
let finalScore = 0; // Track the user's score
let timer; // Store the timer so it can be cleared



function startTimer() {
    // Clear any existing timer before starting a new one
    if (timer) {
    clearInterval(timer);
  }

    let timeLeft = 10; // Reset the timer for the new question
    
    const timerElement = document.getElementById("timer"); 
    if (!timerElement) {
        console.error("Timer element not found in the DOM!");
        return; // Exit the function to avoid further errors
      }

    timer = setInterval(() => {
      if (timeLeft > 0) {
        timerElement.textContent = timeLeft; // Reuse the reference
        timeLeft--;
      } else {
        clearInterval(timer); // Stop the timer at 0
        console.log("Time's up!");
        moveToNextQuestion();
      }
    }, 1000);
  }

  
function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
 
  root.innerHTML = "";

   // Clear and render question
   root.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        ${currentQuestion.options
        .map((option) => `<button class="option">${option}</button>`)
        .join("")}
        <p>Time Left: <span id="timer">10</span> seconds</p>
    `;

  // Attach event listeners to buttons
  const buttons = document.querySelectorAll(".option");
  buttons.forEach((button) =>
    button.addEventListener("click", showAnswer)
  );

  // Start the timer after everything is set up
  startTimer();
}

function showAnswer(event) {
    console.log("Dummy handler triggered for:", event.target.textContent);

  const selectedAnswer = event.target.textContent;
  const currentQuestion = questions[currentQuestionIndex]; // Access it directly
  const answer = currentQuestion.answer;

  const buttons = document.querySelectorAll(".option");
 
  // Highlight buttons based on correctness
   buttons.forEach((button) => {
    if(button.textContent === answer){
        button.style.backgroundColor = "green";
    }else if(button.textContent === selectedAnswer){
        button.style.backgroundColor = "red";
    }else{
        button.style.backgroundColor = "";
    }
  });

  // Provide feedback
  if (selectedAnswer === answer) {
    finalScore++; // Increment score if correct
    console.log("Correct!");
  } else {
    console.log("Incorrect :(");
  }

  console.log(`Selected: ${selectedAnswer}, Correct: ${answer}`);
  // Add a small delay before moving to the next question
  setTimeout(() => {
    moveToNextQuestion();
  }, 2000); // Delay of 1 second for visual feedback
}

function moveToNextQuestion() {
    currentQuestionIndex++;  
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showFinalScore(); // Show the user's final score when the quiz ends
    }
  }

function showFinalScore() {
  root.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your total score: ${finalScore} of ${questions.length}</p>
    <button id = 'restart'>Restart Quiz</button>
    `;
  document.getElementById("restart").addEventListener("click", restartQuiz);
}

function restartQuiz() {
  currentQuestionIndex = 0;
  finalScore = 0;
  showQuestion();
}
