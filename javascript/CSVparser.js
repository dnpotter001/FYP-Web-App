

//buttons for upload
const fileInput = document.getElementById("csvFile");
const uploadButton = document.getElementById("uploadCSV");
const fileNameLabel = document.getElementById("fileNameLabel");
const generateButton = document.getElementById("generateTable");

//global variable
let 
  workoutOverviewLabels,
  workoutOverview, 
  numberOfIntervals, 
  intervalsoverviewLabels, 
  intervalsOverview;

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

generateButton.addEventListener("click", e => {
  if( fileInput.value){
    overviewTable();
    intervalTable();
  } else {
    fileNameLabel.innerText = "Upload a CSV first";
  }
})

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
      let data = allTextLines[i].split(',');
      const tarr = [];
      for (let j=0; j<data.length; j++) {
        tarr.push(data[j]);
      }
      lines.push(tarr);
  }
  //console.log(lines);
  arrayToWorkoutOverview(lines);

}

function arrayToWorkoutOverview(array){

  //each array entry contains another array of 1 entry, this has to be taken out and split
  workoutOverviewLabels = array[12];
  workoutOverview = array[14];
  numberOfIntervals = workoutOverview[0];

  printWorkoutOverview(workoutOverviewLabels, workoutOverview);
  arrayToIntervalOverview(array, numberOfIntervals);

}

function arrayToIntervalOverview(array, intervalCount){
  intervalsOverview = [];
  for(let i = 0; i < intervalCount; i++){
    intervalsOverview[i] = array[i + 20];
  }
  for(x in intervalsOverview){
    console.log(intervalsOverview[x]);
  }  

  
}

function printWorkoutOverview(labels, workoutAverages){
  console.log("Your workout: ")
  for(x in labels){
    console.log(labels[x] + " : " + workoutAverages[x]);
  }
}

function overviewTable(){

}

function intervalTable(){

}



function stringToWorkoutObj(){

}

function errorHandler(){
  fileNameLabel.innerText = "Error loading CSV...";
}