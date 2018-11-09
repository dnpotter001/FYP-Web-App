//gets the canvas from html file
const chartArea = document.getElementById("chart");
//gets the device pixel ratio and size of canvas
const dpr = window.devicePixelRatio || 1;
const rect = chartArea.getBoundingClientRect();

console.log(dpr);

let value = [12,3,4,5,9];

function drawLine(ctx, startX, startY, endX, endY, colour){
  ctx.save();
  ctx.strokeStyle = colour;
  ctx.lineWidth = 2 * dpr;
  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
}

function drawBar(ctx, upperLX, upperLY, width, height, colour, label){
  ctx.save();
  ctx.fillStyle = colour;
  ctx.fillRect(upperLX, upperLY, width, height);
  ctx.restore;
}

let BarChart = function(canvas, data, gridScale, seriesName, padding){
  
 
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.canvas.width = rect.width * dpr;
  this.canvas.height = rect.height * dpr;
  
  //sets the max value
  this.maxValue = 0;
  for(x in data){
    if(this.maxValue < data[x]){
      this.maxValue = data[x];
    }
  }

  let canvasW = this.canvas.width - padding;
  let canvasH = this.canvas.height - padding;

  //function for drawing grid lines
  this.DrawGridLine = function(){
    let gridValue = 0; 
    let lineNo = 0;
    let numberOfLines = this.maxValue / gridScale;
    let lineGap = (canvasH / numberOfLines)-10;
    while(gridValue <= this.maxValue){
      let yHeight = (canvasH) * (1 - gridValue/this.maxValue) +  padding;
      drawLine(
        this.ctx,
        0,
        yHeight,
        canvasW,
        yHeight,
        "#000000"
      );

      //adds labels to lines 
      this.ctx.save();
      this.ctx.font = "bold " + 10 * dpr + "px Arial";
      console.log(gridValue);
      this.ctx.fillText(gridValue, 0, yHeight);
      this.ctx.restore();
      lineNo++

      gridValue = gridValue + gridScale;
    }
  }

  this.drawBars = function(){
    let barNo = 0;
    let barWidth = canvasW / data.length;
    let barIncrement = canvasH / this.maxValue;

    for(x in data){
      drawBar(
        this.ctx,
        barNo * barWidth, 
        (this.maxValue - data[x])*barIncrement, 
        barWidth, 
        data[x] *barIncrement, 
        getRandomColor(),
        x
      );
      barNo++
    }
  }



  
}

let chart = new BarChart(chartArea, value, 2, "chart", 10);
console.log(chart.maxValue);
chart.DrawGridLine();
chart.drawBars();

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
