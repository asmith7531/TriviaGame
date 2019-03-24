
var answers = undefined;

var correct = 0;

var incorrect = 0;

var time = undefined;

var i = 0; //iterator, is used to make sure we dont get the same question from the JSON 

// sets url var equal to trivia api key request
var url = "https://opentdb.com/api_token.php?command=request"

var token= undefined;



//rearranges arrays using the sort method
function randomShuffle(array){
  array.sort(()=>Math.random()-0.5)
}

//adds event listener for clicks to our start button
$("#startBtn").on("click", function(event) {
  //calling the begin function to write a question, the answers, and the timer to the DOM
  begin();
  var countDown = setInterval(startCount,1000);
  //prevents the above code from executing until clicked
  event.preventDefault();
})

//reset function resets the question and answers to the next question in the response array
function reset(){
  //removes the dynamically created answer buttons
  $(".answerBtn").remove();
  //removes the dynamically created question 
  $(".question").remove();
  //calls the getQuestion function so we can see a new question and answer appear
  getQuestion();
}

//iscorrect function alerts the user that their answer was correct, increments the correct score and calls reset()
function iscorrect(){
  //calls the reset function
  reset();
  
  correct++
  
  // $(".correct").text("Correct Answers: " + correct);
  $(".correct").text("Correct: " + correct)
}

//this alerts the user that their answer was incorrect, increments the incorrect score and calls reset()
function iswrong(){
  
  reset();
  
  incorrect++
  
  $(".incorrect").text("Incorrect: " + incorrect);
}
//adds click event listeners to the right and wrong answers
$(document).on("click", ".right", iscorrect)
$(document).on("click", ".wrong", iswrong)


//my counter
function startCount(){
  
  time--;
  
  $("#clock").text(time);
  
  if(time===-1){
    
    alert("You ran out of time... Next Question!");
    
    incorrect ++
    
    $(".incorrect").text("Incorrect Answers:" + incorrect);
    
    reset()
  }
}
//starts the startCount function and sets it to repeat one time per second

function begin()  {
  correct = 0;
  incorrect = 0;
  reset();
  $('#startBtn').remove();
}

function getQuestion(){
  
  $.ajax ({
  
    method:"GET",
  
    url: url
  //promise that waits until the ajax query is finished loading 
  }).then(function(response){
    //sets the token var equal to the "token" parameter of the response from the token request ajax query
    token = response.token;
  
    console.log(token)
  
    //ajax query to the trivia api for an unfiltered response that is 50 objects long
    
    console.log(response);
    
    console.log(i)
  $.ajax ({
    
    method:"GET",
    
    //adds the api parameter request and the token 
    url: "https://opentdb.com/api.php?amount=50&token="+token
    
    //promise callback function
  }).then( function (response) {
    var questionAPI = JSON.stringify(response.results[i].question);
    
    var rightAPI = response.results[i].correct_answer;
    
    var wrong1API = response.results[i].incorrect_answers[0];
    
    var wrong2API = response.results[i].incorrect_answers[1];
    
    var wrong3API = response.results[i].incorrect_answers[2];
    
    //increases var i (our iterator defined in the global scope) so that the next question will be next in the JSON string 
    i++
    //sets the time equal to 31 seconds so that when it appears in the html the counter displays 30 seconds due to the 1000 ms timout
    time = 31;

  //creates the question and answers and adds them to the HTML, also calls the random shuffle function 
  function writeElements()  {

    console.log(questionAPI)

    $(".questions").append($("<p>").text(questionAPI).addClass("question"));

    var answers = [rightAPI, wrong1API, wrong2API, wrong3API]
    
    randomShuffle(answers);
    
    //iterates through the answers array and adds the answers to the HTML
    for (var i = 0; i < answers.length; i++) {
    
      if(answers[i]===rightAPI){
    //tried to replace the quotes and apostrophes as i added the text, if i had more time i would make them variables replace them then .text() the strings to the DOM
        $(".answers").append($("<button>").addClass("answerBtn right btn btn-dark btn-lg").text(answers[i].replace(/&quot;/, "\\").replace(/&#039;/, '\\')))  
      }
      
      else{
    
        $(".answers").append($("<button>").addClass("answerBtn wrong btn btn-dark btn-lg").text(answers[i].replace(/&quot;/, "\\").replace(/&#039;/, '\\') ))    
      }
    }
  }
   
   writeElements();

   $(".answerBtn").click(function(){
    })

    if(correct===10){

      alert("You Win!")

      $(".correct").text("Correct:");

      (".incorrect").text("Incorrect:");

      begin();
    }
    else if(incorrect===10){

      alert("You Lose!")

      $(".correct").text("Correct:");

      $(".incorrect").text("Incorrect:");

      begin();
    }
  })
})
}

