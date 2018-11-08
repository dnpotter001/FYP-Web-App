//buttons and canvas
const button = document.getElementById("barchart");
const canvas = document.getElementById("chart");

//seting the canvas size
canvas.height = 300;
canvas.width = 300;

//telling the browser that this is going to be a 2d canvas
const ctx = canvas.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY, colour){
  ctx.save();
  ctx.strokeStyle = colour;
  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();

}

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, colour){
  ctx.save();
  ctx.fillStyle = colour;
  ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
  ctx.restore();
}

var myVinyls = {
  "Classical music": 10,
  "Alternative rock": 14,
  "Pop": 2,
  "Jazz": 12
};

let BarChart = function(options){
  this.options = options;
  this.canvas = options.canvas
  this.ctx = this.canvas.getContext("2d");
  this.colours = options.colours;

  this.draw = function(){
    let maxValue = 0;
    for (let categ in this.options.data){
      maxValue = Math.max(maxValue, this.options.data[categ]);
    }
    let canvasActualHeight = this.canvas.height - this.options.padding *2;
    let canvasActualWidth = this.canvas.width - this.options.padding *2;

    //drawing the grid lines
    let gridValue = 0;
    while (gridValue <= maxValue){
      let gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
      drawLine(
        this.ctx,
        0,
        gridY,
        this.canvas.width,
        gridY,
        this.options.gridColour
      );

      //writing grid markers
      
      
      this.ctx.save();
      this.ctx.fillStyle = this.options.gridColour;
      this.ctx.font = "bold 10px Arial";
      this.ctx.fillText(gridValue, 10,gridY - 2);
      this.ctx.restore();
 
      gridValue+=this.options.gridScale;
      
    }

    //drawing the bar 
    let barIndex = 0;
    let numberOfBars = Object.keys(this.options.data).length;
    let barSize = (canvasActualWidth)/numberOfBars;

    for(categ in this.options.data){
      let val = this.options.data[categ];
      let barHeight = Math.round(canvasActualHeight * val/maxValue);
      drawBar(
        this.ctx,
        this.options.padding + barIndex * barSize,
        this.canvas.height - barHeight - this.options.padding,
        barSize,
        barHeight,
        this.colours[barIndex%this.colours.length]
      );

      barIndex++;
    }
  }
}

let myBarchart = new BarChart(
  {
      canvas:canvas,
      padding:10,
      gridScale:5,
      gridColour:"#eeeeee",
      data:myVinyls,
      colours:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
  }
);
myBarchart.draw();





