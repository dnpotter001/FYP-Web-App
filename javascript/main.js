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
const all = document.getElementById("all");

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


//event listeners
menuButton.addEventListener("click", openClose);
window.addEventListener("resize", resetCSS);

//displays and hides the side menu
function openClose(){
    if (navbar.style.width === "150px") {
        navbar.style.width = "0";
        all.style.marginLeft = "0";
        menuButton.style.left =" 20px";
    } else {
        navbar.style.width = "150px";
        all.style.marginLeft = "150px";
        menuButton.style.left =" 170px";
    }
}

//resets the css when whole browser is resized
function resetCSS(){
  navbar.style.width = "";
  all.style.marginLeft = "";
  menuButton.style.left ="";

}