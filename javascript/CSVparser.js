

//buttons for upload
const fileInput = document.getElementById("csvFile");
const uploadButton = document.getElementById("uploadCSV");
const fileNameLabel = document.getElementById("fileNameLabel");


uploadButton.addEventListener("click", e => {
  fileInput.click();
});

//listen for a click and
fileInput.addEventListener("change", e => {
  //valid CSV file 
  if (fileInput.value){
    validateCSV(fileInput);
    csvToArray(fileInput.files[0]);
  } 
 else {
    fileNameLabel.innerHTML = "No file chosen";
  }
});


function validateCSV(input){
  const fileName = input.value;
  const fileExt = fileName.split(".").pop().toLowerCase();
  if (fileExt === "csv"){
    fileNameLabel.innerText = fileInput.value.match( /[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
  } else {
    fileNameLabel.innerText = "Not a CSV file";
  }
}

function csvToArray(upload){
  const fileReader = new FileReader();
  fileReader.readAsText(upload);
  fileReader.onload = loadHander;
  fileReader.onerror = errorHandler;
}

function loadHander(){
  const csv = event.target.result;
  console.log(csv);
}

function arrayToRelevantStrings(){


}

function stringToWorkoutObj(){

}

function errorHandler(){

}