$(document).ready(function() {

console.log("Hello");
   // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBDPoyGiuGmoZT_KHT7YqEaik5-YaPO3X0",
    authDomain: "kucod-2a4bc.firebaseapp.com",
    databaseURL: "https://kucod-2a4bc.firebaseio.com",
    projectId: "kucod-2a4bc",
    storageBucket: "kucod-2a4bc.appspot.com",
    messagingSenderId: "48127573521"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var dest = "";
var firstTime = "";
var freq = ""; 

 $("button").on("click", function(){
    trainName = $("#train-name-input").val().trim();
    dest = $("#dest-input").val().trim();
    firstTime = $("#first-train-input").val().trim();
    freq = $("#freq-input").val().trim();

    var newElement = database.ref('NewTrain/').push();
    newElement.set({
      trainName : trainName,
      dest : dest,
      firstTime : firstTime,
      freq : freq
    });
  });

  database.ref("NewTrain/").on("value", function(snapshot){
    snapshot.forEach(function(trainSnapshot){
      var trainValues = trainSnapshot.val();
      var minutesAway = calculateMinutesAway(trainValues.freq, trainValues.firstTime);
      $("tbody").append('<tr class="child"><td>' 
        + trainValues.trainName + '</td>' 
        + '<td>' + trainValues.dest + '</td>' 
        + '<td>' + trainValues.freq + '</td>'
        + '<td>' +  + '</td>' 
        + '<td>' + minutesAway + '</td>' + "</tr>");
    });
  });

function calculateMinutesAway(trainfreq, startTime){
//get first train arrival
var nextArrival = firstTime;
// get current time
var currentTime = moment().format('HHmm');
//get time passed today and grab start time in same format

var startTime = startTime;
//take the current time - the start time to get the time that has passed
var timePassed = currentTime - startTime;
//time passed divided by trainfreq = time since last train
var timeSinceLastTrain = timePassed % trainfreq;
// get minutes away by taking train freq - timesincelasttrain
var minutesAway = trainfreq - timeSinceLastTrain;

return minutesAway;

};
//current train time + minutes away 

// 12:32 % 5 

});