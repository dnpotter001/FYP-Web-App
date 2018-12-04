

//all global variable are delcared
//menu elements
const navbutton = document.getElementById("navbutton");
const navbar = document.getElementById("navbar");

//other ui elements
const tableArea = document.getElementById("tables");

//buttons
const fileInput = document.getElementById("csvFile");
const uploadButton = document.getElementById("uploadCSV");
const fileNameLabel = document.getElementById("fileNameLabel");
const generateButton = document.getElementById("generateTable");



//ojbects
let workout = {};

//open side menu
navbutton.addEventListener("click", () => {
  console.log("toggled");
  navbar.classList.toggle("nav-open");
  document.body.classList.toggle("menu-open")
});

//click anywhere to close side menu
window.addEventListener("mouseup", (event) => {
  if(event.target != navbar && event.target != navbutton ){
    console.log("closing menu")
    navbar.classList.remove("nav-open");
    document.body.classList.remove("menu-open")
  }
})

