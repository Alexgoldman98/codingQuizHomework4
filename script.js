//global variables
var showQuestions = document.getElementById("quizPage");
var questionNum = 0;
var answer = " ";
var i = 0;
var timeleft = 75;
var countdown = document.getElementById("countdown")
var scorePage = document.getElementById('scorePage')
var myTimer = 0;


//array to store questions and answers
var questions = [{ question: 'Commonly used data types do NOT include:',
    answers:['strings','booleans','alerts', 'numbers'],
    correct:'alerts'},
    { question: 'The condition of an if/else statement is enclosed within ___', 
    answers:['quotes','curly braces','parentheses', 'square brackets'],
    correct:'parentheses'},
    {  question: 'Arrays in Javascript can be used to store ____',
    answers:['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
    correct:'all of the above' },
    { question: 'String Values must be enclosed within ____ when being assigned to variables',
    answers: ['commas','curly brackets','quotes', 'parentheses'],
    correct: 'quotes' },
    { question:'A very useful tool used during development and debugging for printing content to the debugger is:',
    answers:['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
    correct:'console.log'},]


    //when the startQuiz button is pressed or when the play again button is pressed:
function startQuiz(){
    console.log('started!')

    //hide start page
    var startingPage = document.getElementById('startPage');
    startingPage.setAttribute("hidden", " ");

    //hide scorePage
    scorePage.setAttribute('hidden'," ")

    //show questions
    showQuestions.removeAttribute("hidden");

    //show timer
    countdown.removeAttribute("hidden")
    
    questionNum = 0;
    i = 0;
    timeleft = 75;
    getQuestions()
    timer()
   
}
//to show the questions 
function getQuestions(){
    var question = questions[questionNum]
    var questionEl = document.querySelector('#quizPage')
    
    // display question
    questionEl.innerHTML = `
        <div class="alert"><h3>${question.question}</h3>
        `
    // loop through and show each answer as a button
        for( var i=0; i < question.answers.length; i++ ){
        var answer = question.answers[i]
        questionEl.innerHTML += `
        <button onClick="selectAnswer('${answer}')" class="col container m-2 btn btn-primary btn-group-vertical w-sm-75 role = 'group">${answer}</button>
        `
    } 
    console.log(answer)}

//when an answer is selected it is either correct or time is subtracted
function selectAnswer(answer){
    console.log(answer)
    if (answer == questions[questionNum].correct){
        console.log('correct');
    } else {
        timeleft -= 10;
    }
    questionNum += 1

    if( questionNum<questions.length )
      getQuestions()
    else
      endQuiz()    
}

// the timer counts down by 1 second, every 1000 milliseconds, if there is no time left the quiz is over, if the user finishes the questions the timer dissapears and they are brought to the scorepage
function timer(){
    var myTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(myTimer);
         countdown.innerHTML = "Quiz Over";
        endQuiz()
      } else if(questionNum >= questions.length){
        clearInterval(myTimer);
        countdown.innerHTML = "Quiz Over";
        endQuiz()
      } else{
        countdown.innerHTML = timeleft + " seconds remaining";
      }
      timeleft -= 1;
    }, 1000);
}

// when the quiz is over the score page is shown
function endQuiz(){
    clearInterval(myTimer);
         countdown.innerHTML = "Quiz Over";
    localStorage.setItem('score', timeleft)
    
    //hide questions
     showQuestions.setAttribute("hidden", " ");

    // show scorepage
    scorePage.removeAttribute('hidden');
    scorePage.innerHTML = `
    <div class ="container justify-items-centre m-5 col"> 
        <p> Your score is: '${timeleft}' </p>
        <input id="initials" type="text" class="form-control" type="text" placeholder="Enter Initials"> 
        </input>
        <button  value ='Submit' type="submit" id ='submitInitials' class ='btn btn-primary m-2' onclick ="submitData()"> 
            Submit 
        </button>
    </div>`
}

//when the user enters their initials they are saved in local storage and they are shown the previous high scores
function submitData(){
    var initials = document.getElementById("initials").value;
    var score = localStorage.getItem('score');
    var highScore = JSON.parse(localStorage.getItem("Scores")) || []

    // set a new object 
    var newObject = {
        score : score,
        initials : initials
    };
      // push the new object to highscore
      highScore.push(newObject);
      // set the item for highscore in the scores for local storage
      localStorage.setItem("Scores", JSON.stringify(highScore));
      var scoresObject = JSON.parse(localStorage.getItem('Scores'))
      console.log(scoresObject)
    
        //use initials to store high score locally
        scorePage.innerHTML =`
        <div class ="container justify-items-centre m-2 col">  
        Scores       
        <div class = "scores bg-blue" > 
            </div>
            <button class="btn btn-primary" onclick="startQuiz()"> 
                Play again 
            </button>
            <button class="btn btn-primary" onclick="clearStorage()">
                Clear HighScores
            </button>
        </div>`
        
        var scores = document.querySelector(".scores");
        
        for ( var i = 0; i < scoresObject.length; i++){
            var score = scoresObject[i].score;
            var initials = scoresObject[i].initials;
            var scores = document.querySelector(".scores");
            var ul = document.createElement("ul");
            var li = document.createElement("li");
            var scoreDiv = document.createElement("div");
            scoreDiv.innerHTML = 
                `
                <div class="container m-2 btn-outline-secondary" > Score : ${score} Initials: ${initials} </div>
                `
            li.appendChild(scoreDiv);
            ul.appendChild(li);
            scores.appendChild(scoreDiv);
        }
}    

//if the user clicks on clear highscores, the local storage is erased
function clearStorage(){
    localStorage.clear();
}
