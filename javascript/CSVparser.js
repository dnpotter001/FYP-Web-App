

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
  } 
 else {
    fileNameLabel.innerHTML = "No file chosen";
  }
});

//takes input box, checks if the file is a csv, then changes the label
function validateCSV(input){
  const fileName = input.value;
  const fileExt = fileName.split(".").pop().toLowerCase();
  if (fileExt === "csv"){
    fileNameLabel.innerText = fileInput.value.match( /[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];

    //calls the next function
    csvToArray(input.files[0]);

  } else {
    fileNameLabel.innerText = "Not a CSV file";
  }
}

function csvToArray(upload){
  //creates a file reader that reads csv as text...
  const fileReader = new FileReader();
  fileReader.readAsText(upload);

  //onload the load handler is called, on error the error hander is called
  fileReader.onload = loadHander;
  fileReader.onerror = errorHandler;
}

function loadHander(){
  //result of the last function is handed to the const csv,
  const csv = event.target.result;
  //csv is then printed into the log
  //console.log(csv);
  processData(csv);


}

function processData(csv) {
  //splits the file into lines using a regular expression
  let allTextLines = csv.split(/\r\n|\n/);
  
  const lines = [];
  for (let i=0; i<allTextLines.length; i++) {
      let data = allTextLines[i].split(';');
      const tarr = [];
      for (let j=0; j<data.length; j++) {
        tarr.push(data[j]);
      }
      lines.push(tarr);
  }
//console.log(lines);
arrayToWorkoutArrays(lines);
}

function arrayToWorkoutArrays(array){
  console.log(array[14]);
  console.log(array[12]);

  //each array entry contains another array of 1 entry, this has to be taken out and split
  let workoutOverviewLabels = array[12];
  workoutOverviewLabels = workoutOverviewLabels[0].split(",");
  /* for (x in workoutOverviewLabels){
    console.log(workoutOverviewLabels[x]);
  } */

  let workoutOverview = array[14];
  workoutOverview = workoutOverview[0].split(",");
  /* for (x in workoutOverview){
    console.log(workoutOverview[x]);
  } */

  printWorkout(workoutOverviewLabels, workoutOverview);
  
}

function printWorkout(labels, workoutAverages){
  console.log("Your workout: ")
  for(x in labels){
    console.log(labels[x] + " : " + workoutAverages[x]);
  }

}

function stringToWorkoutObj(){

}

function errorHandler(){
  fileNameLabel.innerText = "Error loading CSV...";
}