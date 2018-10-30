

//buttons for upload
const fileInput = document.getElementById("csvFile");
const uploadButton = document.getElementById("uploadCSV");
const fileNameLabel = document.getElementById("fileNameLabel");
const generateButton = document.getElementById("generateTable");

//section for table generation 
const tableArea = document.getElementById("tables");


//global variable
// let
//   workoutOverviewLabels,
//   workoutOverview,
//   numberOfIntervals,
//   intervalsoverviewLabels,
//   intervalsOverview;

let workout = {};


uploadButton.addEventListener("click", e => {
  fileInput.click();
});

//listen for a click and
fileInput.addEventListener("change", e => {
  //valid CSV file 
  if (fileInput.value) {
    validateCSV(fileInput);
  }
  else {
    fileNameLabel.innerHTML = "No file chosen";
  }
});

generateButton.addEventListener("click", e => {
  if (fileInput.value) {
    generateTable(workoutOverview, workoutOverviewLabels);
    generateTable(intervalsOverview, intervalsoverviewLabels);
  } else {
    fileNameLabel.innerText = "Upload a CSV first";
  }
})

//takes input box, checks if the file is a csv, then changes the label
function validateCSV(input) {
  const fileName = input.value;
  const fileExt = fileName.split(".").pop().toLowerCase();
  if (fileExt === "csv") {
    fileNameLabel.innerText = fileInput.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];

    //calls the next function
    csvToArray(input.files[0]);

  } else {
    fileNameLabel.innerText = "Not a CSV file";
  }
}

function csvToArray(upload) {
  //creates a file reader that reads csv as text...
  const fileReader = new FileReader();
  fileReader.readAsText(upload);

  //onload the load handler is called, on error the error hander is called
  fileReader.onload = loadHander;
  fileReader.onerror = errorHandler;
}

function loadHander() {
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
  for (let i = 0; i < allTextLines.length; i++) {
    let data = allTextLines[i].split(',');
    const tarr = [];
    for (let j = 0; j < data.length; j++) {
      tarr.push(data[j]);
    }
    lines.push(tarr);
  }
  //send array of csv to constructor to produce workout object
  workout = new Workout(lines);

}



function printWorkoutOverview(workout) {
  console.log(workout)
  console.log(workout.getOverviewLabel());
  console.log(workout.getOverview());
  console.log(workout.getIntervalsLabels()); 
  console.log(workout.getIntervals());
  

}

function generateTable(data, label) {
  let table = document.createElement("table");
  let tableRow = document.createElement("tr");

  for (x in label) {
    console.log(label[x]);
    let tableCell = document.createElement("td");
    tableCell.appendChild(document.createTextNode(label[x]));
    tableRow.appendChild(tableCell);
  }

  table.appendChild(tableRow);
  tableRow = document.createElement("tr");

  for (x in data) {
    let internalData = data[x];

    if (internalData.constructor === Array) {
      for (y in internalData) {
        console.log(internalData[y]);
        let tableCell = document.createElement("td");
        tableCell.appendChild(document.createTextNode(internalData[y]));
        tableRow.appendChild(tableCell);
      }
      table.appendChild(tableRow);
      tableRow = document.createElement("tr");
    }
    else {
      console.log(data[x]);
      let tableCell = document.createElement("td");
      tableCell.appendChild(document.createTextNode(data[x]));
      tableRow.appendChild(tableCell);
    }
    table.appendChild(tableRow);

  }

  tableArea.appendChild(table);

}


function Workout(array) {

  //add workout overview information to the object
  this.workoutOverviewLabels = array[12];
  this.workoutOverview = array[14];
  this.numberOfIntervals = this.workoutOverview[0];

  //adds interval information to obj
  this.intervalsLabels = array[18];
  this.intervals = [];
  for (let i = 0; i < this.numberOfIntervals; i++) {
    this.intervals[i] = array[i + 20];
  }

  //getters for obj
  this.getOverview = function(){
    return this.workoutOverview;
  }
  this.getOverviewLabel = function() {
    return this.workoutOverviewLabels;
  }
  this.getIntervals = function(){
    return this.intervals;
  }
  this.getIntervalsLabels = function(){
    return this.intervalsLabels;
  }


}





function errorHandler() {
  fileNameLabel.innerText = "Error loading CSV...";
}