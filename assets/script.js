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
var firstArrival = "";
var currentTime = moment();

// Capture Button Click
$("#add-train").on("click", function(event) {
  event.preventDefault();

  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  frequency = $("#frequency-input").val().trim();
  firstArrival = $("#firstArrival-input").val().trim();

  // Code for the push
  database.ref().push({
    name: name,
    destination: destination,
    frequency: frequency,
    firstArrival: firstArrival,
  });
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function(childSnapshot, prevChildkey) {

  var sv = childSnapshot.val();
  var newName = (sv.name);
  var newDestination = (sv.destination);
  var newfrequency = (sv.frequency);
  var newfirstArrival = (sv.firstArrival);
  var diffTime = moment().diff(moment(newfirstArrival,"HH:mm"), "minutes");
  var tRemainder = diffTime % newfrequency;
  var tMinutesTillTrain = newfrequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  nextTrain =  moment(nextTrain).format("hh:mm");



$(".table").append(

  "<tr><td>" +
  
    newName +
  
  "</td><td>" +

    newDestination +

  "</td><td>" +

    newfrequency +

  "</td><td>" +

    newfirstArrival +

  "</td><td>" +

    tMinutesTillTrain +

  "</td><td>" +

    nextTrain +

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
  $("#firstArrival-display").append(snapshot.val().firstArrival);
});

console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
console.log("DIFFERENCE IN TIME: " + diffTime);
console.log(tRemainder);
console.log(frequency);
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));