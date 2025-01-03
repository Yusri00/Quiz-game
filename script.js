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

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  console.log(currentQuestion);

  // Clear the `root` element
  root.innerHTML = "";

  // Clear and render question
  root.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        ${currentQuestion.options
          .map((option) => `<button class="option">${option}</button>`)
          .join("")}
    `;

  // Attach event listeners to the option buttons
  const buttons = document.querySelectorAll(".option");
 
  buttons.forEach((button) => button.addEventListener("click", showAnswer));
  startTimer();
}

function startTimer() {
  let timeLeft = 10;

  //Display timer
  root.innerHTML += `<p>Time Left: <span id = 'timer'>${timeLeft}</span> seconds</p>`;

  timer = setInterval(() => {
    if (timeLeft > 0) {
    //   console.log('Time Left:', timeLeft);
      document.getElementById("timer").textContent = timeLeft;
      timeLeft--;
    } else {
      clearInterval(timer);
      console.log("Time's up!");
      moveToNextQuestion();
    }
  }, 1000);
}

function showAnswer(event) {
  const currentQuestion = questions[currentQuestionIndex]; // Access it directly
  const answer = currentQuestion.answer;
  const selectedAnswer = event.target.textContent;

  console.log("user selected:", selectedAnswer);

  if (selectedAnswer === answer) {
    finalScore++; // Increment score if correct
    console.log("Correct!");
  } else {
    console.log("Incorrect :(");
  }

  console.log(`The correct answer was: ${answer}`);

  moveToNextQuestion();
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
