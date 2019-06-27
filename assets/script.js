  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBDP_Kjj77vUx_BgPu1v75v8LU6226O0dQ",
    authDomain: "unit-7-homework-77ac2.firebaseapp.com",
    databaseURL: "https://unit-7-homework-77ac2.firebaseio.com",
    projectId: "unit-7-homework-77ac2",
    storageBucket: "unit-7-homework-77ac2.appspot.com",
    messagingSenderId: "766411843496",
    appId: "1:766411843496:web:9f2421d5e1dd8600"
  };
  firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var name = "";
var destination = "";
var frequency = 0;
var nextArrival = "";

// Capture Button Click
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // YOUR TASK!!!
  // Code in the logic for storing and retrieving the most recent user.
  // Don't forget to provide initial data to your Firebase database.
  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  frequency = $("#frequency-input").val().trim();
  nextArrival = $("#nextArrival-input").val().trim();

  // Code for the push
  database.ref().push({
    name: name,
    destination: destination,
    frequency: frequency,
    nextArrival: nextArrival,
  });
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function(childSnapshot, prevChildkey) {

  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().frequency);
  console.log(childSnapshot.val().nextArrival);

  var sv = childSnapshot.val();
  var newName = (sv.name);
  var newDestination = (sv.destination);
  var newfrequency = (sv.frequency);
  var newnextArrival = (sv.nextArrival);

// function militaryTime{

//   var tFrequency = 3;

//   // Time is 3:30 AM
//   var firstTime = "03:30";

//   // First Time (pushed back 1 year to make sure it comes before current time)
//   var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
//   console.log(firstTimeConverted);

//   // Current Time
//   var currentTime = moment();
//   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//   // Difference between the times
//   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//   console.log("DIFFERENCE IN TIME: " + diffTime);

//   // Time apart (remainder)
//   var tRemainder = diffTime % tFrequency;
//   console.log(tRemainder);

//   // Minute Until Train
//   var tMinutesTillTrain = tFrequency - tRemainder;
//   console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

//   // Next Train
//   var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

// }

$(".table").append(

  "<tr><td>" +
  
    newName +
  
  "</td><td>" +

    newDestination +

  "</td><td>" +

    newfrequency +

  "</td><td>" +

    newnextArrival +

  "</td><td>" +

  "</td></tr>"

);

}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});



database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
  // Change the HTML to reflect
  $("#name-display").append(snapshot.val().name);
  $("#destination-display").append(snapshot.val().destination);
  $("#frequency-display").append(snapshot.val().frequency);
  $("#nextArrival-display").append(snapshot.val().nextArrival);
});