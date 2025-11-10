const question = [
    {
        question: "What is the tourist capital of Zambia?",
        answers: [
            { text: "Lusaka", correct: false },
            { text: "Livingstone", correct: true },
            { text: "Ndola", correct: false },
            { text: "Kitwe", correct: false }
        ]
    },
    {
        question: "What is the largest animal in the world?",
        answers: [
            { text: "Lion", correct: false },
            { text: "White Rhino", correct: false },
            { text: "Elephant", correct: false },
            { text: "Blue Whale", correct: true }
        ]
    },
    {
        question: "Who is our Co-Hort Supervisor?",
        answers: [
            { text: "Tisa", correct: false },
            { text: "Rachel", correct: false },
            { text: "Bracious", correct: true },
            { text: "Mike", correct: false }
        ]
    },
    {
        question: "When was independence attained?",
        answers: [
            { text: "Oct, 1964", correct: true },
            { text: "Feb, 1999", correct: false },
            { text: "Jun, 2007", correct: false },
            { text: "May, 2008", correct: false }
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < question.length) {
        handleNextQuestion();
    } else {
        startQuiz();
    }
});

startQuiz();