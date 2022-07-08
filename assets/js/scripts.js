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
var timeDisplay = document.querySelector("#timer");
var scoreDisplay = document.querySelector("#score-display");
var correctWrong = document.querySelector('#correct-wrong-text');
var questionText = document.querySelector("#display-question");
var correctWrongDiv = document.querySelector('.correct-wrong');
var userInput = document.querySelector("#user-input");

//This variable will be used to determine how much time player should start with 
var time = questionsAndAnswers.length * 11;
//This variable will be used to stop the timer 
var thatTime;
//global questionNumber variable 
var questionNumber = 0;

//This function is responsible for the countdown timer
//if time is less than 1, set time to 0 to end quiz 
function countdown() {
    time--;
    startTimer();
    if (time < 1) {
        time = 0;
    }
}
//Display timer when it is started 
function startTimer() {
    timeDisplay.textContent = "Time: " + time;
}

//This function will stop the timer and store its value to be used to display highscore 
function stopTimer(){
    var thisTime = time; 
    thatTime = thisTime;
    $(timeDisplay).css("display", "none");
    console.log(thisTime);
}

//Start Quiz by hiding the main start quiz page, setting question number to 0 to start with first question, display question and start countdown timer 
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
        var optionButton = document.querySelector("#option" + i);
        var option = choices[i];
        optionButton.textContent = option;
    }
}

//Hide correct and wrong messages when answer is selected 
function hideCorrectWrong(){
    correctWrongDiv.style.display = "none";
}

//Show correct message when answer is selected 
function showCorrect(){
    correctWrongDiv.style.display = "flex";
    correctWrong.textContent = "Correct!";
}

//Show wrong message when answer is selected 
function showWrong(){
    correctWrongDiv.style.display = "flex";
    correctWrong.textContent = "Wrong!";
}

//Check user choice by comparing with solution stored in array 
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

//Display the score by setting it's display style from none to flex and setting the text content to the score message 
function displayScore(){
    $('.display-score').css("display", "flex");
    scoreDisplay.textContent = "Congratulations! Your final score is " + thatTime;
    
}

//End quiz by stopping timer, hiding quiz-page div, and calling displayScore() 
function endQuiz(){
    console.log("done");
    stopTimer();
    $('.quiz-page').css("display", "none");
    displayScore();   
}

//Event listeners 
startQuizButton.click(".start-quiz-class", startQuiz);
startQuizButton.click(".start-quiz-class", startTimer);
$('#option0,#option1,#option2,#option3').click(checksolution);

// displayQuiz.click(".quiz-page", loadNext);