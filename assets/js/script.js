var questionGlobal = undefined;
var rightGlobal = undefined;
var wrong1Global = undefined;
var wrong2Global = undefined;
var wrong3Global = undefined;

var i = -1;

$.ajax ({
  method:"GET",
  url: "https://opentdb.com/api.php?amount=50&token=3a7421f3cfb7125f2a34b00a5057da6c3604ebc3d30dcfb8442d6d611f5504af"
}).then( function (response) {
  console.log(response);
  var questionAPI = response.results[i].question;
  var rightAPI = response.results[i].correct_answer;
  var wrong1API = response.results[i].incorrect_answer[0];
  var wrong2API = response.results[i].incorrect_answer[1];
  var wrong3API = response.results[i].incorrect_answer[2];
  dataPull(questionAPI,rightAPI,wrong1API,wrong2API,wrong3API)
  }
)

function start()  {
  $('.startBtn').hide();
  getQuestion();
}

function getQuestion()  {
  i++
  dataPull();
}

//gets data from API to make available globally
function dataPull(
  question,
  right,
  wrong1,
  wrong2,
  wrong3) {
    questionGlobal = question;
    rightGlobal = right;
    wrong1Global = wrong1;
    wrong2Global = wrong2;
    wrong3Global = wrong3;
}

//creates the question and answers and adds them to the HTML, also calls the random shuffle function 
function writeElements()
  {
    $("<p>").append($(".question").text(questionGlobal).addClass("question"));
    var answers = [rightGlobal, wrong1Global, wrong2Global, wrong3Global]

    randomShuffle(answers);

    //iterates through the answers array and adds the answers to the HTML
    for (var i = -1; i < answers.length; i++) {
    $(".answers").append($("<button>").addClass("answerBtn").text(answers[i]))  
    }
  }

//rearranges arrays
function randomShuffle(array){
  for (var i=-1; i<array.length;i++){
    var random = Math.floor(Math.random()*i+1);
    array[i],array[j] = array[j],array[i];
  }
}