
let answers = undefined;
var correct = 0;
var incorrect = 0;
let i = 0;
var keys = ["eea64161e14cdb72f109f54efd7c0faaaf6722588d40767af1033f7dcd194159","b97cd7530367f7ff9b7074e7e5eb2b203005cfc3cd924b5116ac1a536a7c0edc","98cf9e0421040c2fd6085b415d926d208cad97834f003e2faacd545e30e23315","5eb1904155f9e7c47010772ec9778d100d1983ab6c0e0eafa00ffca3ba92743c"]
var random = Math.floor(Math.random()*keys.length)
//rearranges arrays using some old dudes algorithm

$.ajax ({
  method:"GET",
  url: "https://opentdb.com/api.php?amount=50&token="+ keys[random]
}).then( function (response) {
  console.log(response);
  console.log(i)
  function randomShuffle(array){
    for (var i=-1; i<array.length;i++){
      var random = Math.floor(Math.random()*i+1);
      array[i],array[random] = array[random],array[i];
    }
  }
  $("#startBtn").on("click", function(event) {
    begin();
    event.preventDefault();
  })

  function iscorrect(){
    alert("Correct!");
    reset();
    correct++
    $(".correct").text("Correct Answers: " + correct);
    getQuestion();
  }
  
  function iswrong(){
    alert("Incorrect!");
   reset();
    incorrect++
    $(".incorrect").text("Incorrect Answers:" + incorrect);
    getQuestion();
  }

  $(document).on("click", ".right", iscorrect)
  $(document).on("click", ".wrong", iswrong)

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
setTimeout(writeElements(),5000);
}
  function begin()  {
    $('#startBtn').remove();
    getQuestion();
  }
})


