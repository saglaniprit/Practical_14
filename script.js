const questions = [
    {
        question: "1. Which language is used to structure web pages?",
        options: ["CSS", "HTML", "JavaScript", "Python"],
        answer: "HTML"
    },
    {
        question: "2. Which language is used to style web pages?",
        options: ["HTML", "Java", "CSS", "C++"],
        answer: "CSS"
    },
    {
        question: "3. Which language makes web pages interactive?",
        options: ["JavaScript", "HTML", "SQL", "C"],
        answer: "JavaScript"
    },
    {
        question: "4. Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<href>", "<a>", "<p>"],
        answer: "<a>"
    },
    {
        question: "5. Which symbol is used for comments in JavaScript?",
        options: ["<!-- -->", "//", "##", "**"],
        answer: "//"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const questionNumberElement = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const nextButton = document.getElementById("next-btn");
const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");

// Display the current question
function loadQuestion() {
    selectedAnswer = null;

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;
    questionNumberElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreElement.textContent = `Score: ${score}`;

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    optionsElement.innerHTML = "";

    nextButton.disabled = true;
    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Finish Quiz"
            : "Next Question";

    // Create buttons for the answer options
    q.options.forEach(option => {
        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option");

        button.addEventListener("click", function () {
            selectAnswer(button, option);
        });

        optionsElement.appendChild(button);
    });
}

// Handle answer selection
function selectAnswer(button, option) {
    if (selectedAnswer !== null) {
        return;
    }

    selectedAnswer = option;

    const correctAnswer = questions[currentQuestion].answer;
    const optionButtons = document.querySelectorAll(".option");

    // Disable all options after selection
    optionButtons.forEach(btn => {
        btn.disabled = true;

        if (btn.textContent === correctAnswer) {
            btn.classList.add("correct");
        }
    });

    // Check whether the answer is correct
    if (option === correctAnswer) {
        score++;
        button.classList.add("correct");
    } else {
        button.classList.add("wrong");
    }

    scoreElement.textContent = `Score: ${score}`;
    nextButton.disabled = false;
}

// Move to the next question or show the result
nextButton.addEventListener("click", function () {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// Display the final score
function showResult() {
    quizElement.classList.add("hidden");
    resultElement.classList.remove("hidden");

    progressBar.style.width = "100%";

    const percentage = (score / questions.length) * 100;

    document.getElementById("final-score").textContent =
        `Your Score: ${score} out of ${questions.length}`;

    document.getElementById("percentage").textContent =
        `Percentage: ${percentage}%`;
}

// Restart the quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;

    quizElement.classList.remove("hidden");
    resultElement.classList.add("hidden");

    loadQuestion();
}

// Start the quiz
loadQuestion();