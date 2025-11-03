const questions = [
  {
    question: "Which language runs in a web browser?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 3
  },
  {
    question: "What does CSS stand for?",
    answers: ["Cascading Style Sheets", "Colorful Style System", "Computer Styled Syntax", "Creative Style Sheets"],
    correct: 0
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    answers: ["<js>", "<javascript>", "<script>", "<code>"],
    correct: 2
  }
];

let currentQuestion = 0;
let selectedAnswer = null;
let score = 0;

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;
  
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = ""; // clear previous
  selectedAnswer = null;
  
  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.innerText = ans;
    btn.addEventListener("click", () => selectAnswer(i, btn));
    answersDiv.appendChild(btn);
  });
  
  // Update next button
  const nextBtn = document.getElementById("next-btn");
  nextBtn.disabled = true;
  nextBtn.innerText = currentQuestion < questions.length - 1 ? "Next" : "Finish";
}

function selectAnswer(selected, buttonElement) {
  // Remove previous selections
  const allButtons = document.getElementById("answers").querySelectorAll("button");
  allButtons.forEach(btn => btn.classList.remove("selected"));
  
  // Mark selected answer
  buttonElement.classList.add("selected");
  selectedAnswer = selected;
  
  // Enable next button
  document.getElementById("next-btn").disabled = false;
}

function checkAnswer(selected) {
  const q = questions[currentQuestion];
  if (selected === q.correct) {
    alert("🎉 Correct!");
  } else {
    alert("❌ Oops, try again!");
  }
}

function nextQuestion() {
  if (selectedAnswer === null) return;
  
  const q = questions[currentQuestion];
  const allButtons = document.getElementById("answers").querySelectorAll("button");
  
  // Show correct/incorrect answers
  allButtons.forEach((btn, index) => {
    if (index === q.correct) {
      btn.classList.add("correct");
    } else if (index === selectedAnswer && index !== q.correct) {
      btn.classList.add("incorrect");
    }
    btn.disabled = true;
  });
  
  // Update score
  if (selectedAnswer === q.correct) {
    score++;
  }
  
  // Wait then move to next question or show results
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1500);
}

function showResults() {
  const percentage = Math.round((score / questions.length) * 100);
  
  document.getElementById("question").innerText = "Quiz Complete!";
  document.getElementById("answers").innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <h3 style="color: #667eea; margin-bottom: 15px;">Your Score</h3>
      <p style="font-size: 2rem; font-weight: bold; color: #2c3e50; margin-bottom: 10px;">
        ${score} / ${questions.length}
      </p>
      <p style="font-size: 1.2rem; color: #495057; margin-bottom: 20px;">
        ${percentage}%
      </p>
      <p style="color: #6c757d;">
        ${getScoreMessage(percentage)}
      </p>
    </div>
  `;
  
  const nextBtn = document.getElementById("next-btn");
  nextBtn.innerText = "Restart Quiz";
  nextBtn.disabled = false;
  nextBtn.onclick = restartQuiz;
}

function getScoreMessage(percentage) {
  if (percentage >= 90) return "Excellent! You're a quiz master! 🏆";
  if (percentage >= 70) return "Great job! Well done! 👏";
  if (percentage >= 50) return "Good effort! Keep practicing! 👍";
  return "Don't give up! Try again! 💪";
}

function restartQuiz() {
  currentQuestion = 0;
  selectedAnswer = null;
  score = 0;
  
  const nextBtn = document.getElementById("next-btn");
  nextBtn.onclick = nextQuestion;
  
  showQuestion();
}

// Initialize quiz when page loads
document.addEventListener("DOMContentLoaded", function() {
  showQuestion();
  document.getElementById("next-btn").addEventListener("click", nextQuestion);
});

