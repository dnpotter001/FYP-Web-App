  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAasXA5ssvag-jcCMJQuk6UBc7HyBs-htc",
    authDomain: "mileage-6d74b.firebaseapp.com",
    databaseURL: "https://mileage-6d74b.firebaseio.com",
    projectId: "mileage-6d74b",
    storageBucket: "mileage-6d74b.appspot.com",
    messagingSenderId: "742059742575"
  };
firebase.initializeApp(config);

//all global variable are delcared
//menu elements
const menuButton = document.getElementById("menuButton");
const navbar = document.getElementById("navbar");

//other ui elements
const tableArea = document.getElementById("tables");

//buttons
const fileInput = document.getElementById("csvFile");
const uploadButton = document.getElementById("uploadCSV");
const fileNameLabel = document.getElementById("fileNameLabel");
const generateButton = document.getElementById("generateTable");
const pushButton = document.getElementById("pushToFirebase");
const pullButton = document.getElementById("PullFromFirebase");


//ojbects
let workout = {};


menuButton.addEventListener("click", () => {
  console.log("toggled");
  navbar.classList.toggle("nav-open");
  menuButton.classList.toggle("menu-open");
});

