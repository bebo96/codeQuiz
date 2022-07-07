const questionsAndAnswers = [{
        questionText: "Commonly used data types DO NOT include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        solution: "3. alerts",
    },
    {
        questionText: "Arrays in JavaScript can be used to store ______.",
        choices: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above",
        ],
        solution: "4. all of the above",
    },
    {
        questionText: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        solution: "3. quotes",
    },
    {
        questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: [
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log",
        ],
        solution: "4. console.log",
    },
    {
        questionText: "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
        choices: ["1. break", "2. stop", "3. halt", "4. exit"],
        solution: "1. break",
    },
];

//selectors 
var startQuizButton = $('.start-quiz-class');
var startQuizDisplay = $('.main-page');
var displayQuiz = document.querySelector(".quiz-page");
var questionNumber = 0;
var timeDisplay = document.querySelector("#timer");
var scoreDisplay = document.querySelector("#score-display");
var time = questionsAndAnswers.length * 11;
var correctWrong = document.querySelector('#correct-wrong-text');
var questionText = document.querySelector("#display-question");
var correctWrongDiv = document.querySelector('.correct-wrong');
var thatTime;
var userInput = document.querySelector("#user-input");

function countdown() {
    time--;
    startTimer();
    if (time < 1) {
        time = 0;
    }
}
//Start timer  
function startTimer() {
    timeDisplay.textContent = "Time: " + time;
}

function stopTimer(){
    var thisTime = time; 
    thatTime = thisTime;
    $(timeDisplay).css("display", "none");
    console.log(thisTime);
}

function startQuiz() {
    startQuizDisplay.hide();
    $(startQuizDisplay).css("display", "none");
    $(".quiz-page").css("display", "flex");
    questionNumber = 0;
    displayQuestion();
    setInterval(countdown, 1000);
}

//display the question and solution choices for the current question
function displayQuestion() {
    var question = questionsAndAnswers[questionNumber];
    var choices = question.choices;
    
    questionText.textContent = question.questionText;

    for (let i = 0; i < choices.length; i++) {
        let option = choices[i];
        let optionButton = document.querySelector("#option" + i);
        optionButton.textContent = option;
    }
}

function hideCorrectWrong(){
    correctWrongDiv.style.display = "none";
}

function showCorrect(){
    correctWrongDiv.style.display = "flex";
    correctWrong.textContent = "Correct!";
}

function showWrong(){
    correctWrongDiv.style.display = "flex";
    correctWrong.textContent = "Wrong!";
}

function checksolution() {
    if (this.textContent == questionsAndAnswers[questionNumber].solution && questionNumber < questionsAndAnswers.length) {
        showCorrect();
        setTimeout(hideCorrectWrong, 400);
    }else if (this.textContent !== questionsAndAnswers[questionNumber].solution) {
        showWrong();
        setTimeout(hideCorrectWrong, 400);
        
        time -= 10;
        
        if(time <= 10){
            setTimeout(endQuiz, 600);
        }
    }

    questionNumber++;

    if (questionNumber < questionsAndAnswers.length) {
        setTimeout(displayQuestion, 400);
      } else {
        setTimeout(endQuiz, 400);
      }
}

function displayScore(){
    $('.display-score').css("display", "flex");
    scoreDisplay.textContent = "Congratulations! Your final score is " + thatTime;
    
}

function endQuiz(){
    console.log("done");
    stopTimer();
    $('.quiz-page').css("display", "none");
    displayScore();   
}


startQuizButton.click(".start-quiz-class", startQuiz);
startQuizButton.click(".start-quiz-class", startTimer);

$('#option0,#option1,#option2,#option3').click(checksolution);

// displayQuiz.click(".quiz-page", loadNext);