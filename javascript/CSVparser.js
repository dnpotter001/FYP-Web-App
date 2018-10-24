

//buttons for upload
const csvInput = document.getElementById("csvFile");
const uploadButton = document.getElementById("uploadCSV");
const filename = document.getElementById("fileName");

uploadButton.addEventListener("click", e => {
  csvInput.click();
});

//listen for a click and
csvInput.addEventListener("change", e => {
  //valid CSV file 
  if (csvInput.value){
    validateCSV(csvInput)
  } 
 else {
    filename.innerHTML = "No file chosen";
  }
});


function validateCSV(upload){
  const fileName = upload.value;
  const fileExt = fileName.split(".").pop().toLowerCase();
  if (fileExt === "csv"){
    filename.innerText = csvInput.value.match( /[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
  } else {
    filename.innerText = "Not a CSV file";
  }
}

function csvToArray(){
  
}

function arrayToRelevantStrings(){


}

function stringToWorkoutObj(){

}