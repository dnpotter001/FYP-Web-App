
uploadButton.addEventListener("click", e => {
  fileInput.click();
});

//listen for a click and checks if it is a csv
fileInput.addEventListener("change", e => {
  if (fileInput.value) {
    validateCSV(fileInput);
  }
  else {
    fileNameLabel.innerHTML = "No file chosen";
  }
});

//listens for clicks, uses generate table function to produce 
generateButton.addEventListener("click", e => {
  if (fileInput.value) {
    generateTable(workout.getOverview(), workout.getOverviewLabel());
    generateTable(workout.getIntervals(), workout.getIntervalsLabels());
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
    
    //calls csv to array if csv is valid
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

//csv load handers takes csv and passes it to the csv processor
function loadHander() {
  const csv = event.target.result;
  processData(csv);
}

//csv is split into an array, a field for each line.
//these arrays hold an array filled with words 
function processData(csv) {
  //splits the file into lines using a regular expression
  let allTextLines = csv.split(/\r\n|\n/);
  //final array is created
  const csvArray = [];

  for (let i = 0; i < allTextLines.length; i++) {
    let splitWords = allTextLines[i].split(',');
    const singleLine = [];
    for (let j = 0; j < splitWords.length; j++) {
      singleLine.push(splitWords[j]);
    }
    csvArray.push(singleLine);
  }
  //send array of csv to constructor to produce workout object
  workout = new Workout(csvArray);
  printWorkoutOverview(workout);

}


//prints overview of workout to make sure creation is successful
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