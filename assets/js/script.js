
let answers = undefined;
var correct = 0;
var incorrect = 0;
var i = 0; //iterator
// sets url var equal to trivia api key request
var url = "https://opentdb.com/api_token.php?command=request"
let token= undefined;
//makes the request and sets the var "token" to the json parameter that is the token
$.ajax ({
  method:"GET",
  url: "https://opentdb.com/api_token.php?command=request"
}).then(function(response){
 token = response.token;
 console.log(token)


$.ajax ({
  method:"GET",
  //adds the api parameter request and the token 
  url: "https://opentdb.com/api.php?amount=50&token="+token
}).then( function (response) {

  console.log(response);
  console.log(i)

  //rearranges arrays using some old dudes algorithm
  function randomShuffle(array){
    for (var i=-1; i<array.length;i++){
      var random = Math.floor(Math.random()*i+1);
      array[i],array[random] = array[random],array[i];
    }
  }

  //adds event listener to our start button
  $("#startBtn").on("click", function(event) {
    begin();
    //prevents the above code from executing after the .ajax query loads
    event.preventDefault();
  })

  //this resets the question and answers
  function reset(){
    $(".answerBtn").remove();
    $(".question").remove();
    getQuestion();
  }

  //this alerts the user that their answer was correct, increments the correct score and calls reset()
  function iscorrect(){
    alert("Correct!");
  clearInterval(startCount,1000)
    reset();
    correct++
    $(".correct").text("Correct Answers: " + correct);
  }

  //this alerts the user that their answer was incorrect, increments the incorrect score and calls reset()
  function iswrong(){
    alert("Incorrect!");
  clearInterval(startCount,1000)
   reset();
    incorrect++
    $(".incorrect").text("Incorrect Answers:" + incorrect);
  }
  
  $(document).on("click", ".right", iscorrect)
  $(document).on("click", ".wrong", iswrong)

  //amount of time per question
var time = 31;
  //decrements the time and writes the result to the html
function startCount(){
  time--;
  $("#clock").text(time);
}


function getQuestion(){
  var questionAPI = response.results[i].question;
  var rightAPI = response.results[i].correct_answer;
  var wrong1API = response.results[i].incorrect_answers[0];
  var wrong2API = response.results[i].incorrect_answers[1];
  var wrong3API = response.results[i].incorrect_answers[2];
  i++
//creates the question and answers and adds them to the HTML, also calls the random shuffle function 
function writeElements()  {
  
  console.log(questionAPI)
  $(".questions").append($("<p>").text(questionAPI).addClass("question"));
  var answers = [rightAPI, wrong1API, wrong2API, wrong3API]
  randomShuffle(answers);
  //iterates through the answers array and adds the answers to the HTML
  for (var i = 0; i < answers.length; i++) {
    if(answers[i]===rightAPI){
    $(".answers").append($("<button>").addClass("answerBtn right").text(answers[i]))  
  }
  else{
    $(".answers").append($("<button>").addClass("answerBtn wrong").text(answers[i]))
  }
}
}
setTimeout(writeElements,1000);

setInterval(startCount,1000);
setTimeout(incorrect,35000)
}
  function begin()  {
    $('#startBtn').remove();
    getQuestion();
  }
})
})

