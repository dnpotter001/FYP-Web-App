//gets the canvas from html file
const chartArea = document.getElementById("chart");


function setupCanvas(canvas) {
  let dpr = window.devicePixelRatio || 1;
  let ctx = canvas.getContext('2d');
  let rect = canvas.getBoundingClientRect();
  //new scaling to improve sharpness
  canvas.width = rect.width * (dpr+ 1);
  canvas.height = rect.height * (dpr + 1);
  ctx.scale(dpr, dpr);
  //old scaling
  // canvas.width = rect.width * dpr;
  // canvas.height = rect.height * dpr;
  // ctx.scale(dpr, dpr);
  return ctx;
}

let value = [12,3,4,5,9,13];

function drawLine(ctx, startX, startY, endX, endY, colour){
  ctx.save();
  ctx.strokeStyle = colour;
  ctx.lineWidth = 4 ;
  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
}

function drawBar(ctx, upperLX, upperLY, width, height, colour, label){
  ctx.save();
  ctx.fillStyle = colour;
  ctx.font = "bold 30px Arial";
  ctx.textAlign ="center";

  ctx.fillRect(upperLX, upperLY, width, height);
  ctx.fillText(label, upperLX+(width/2), upperLY-5);
  ctx.restore();
}

let BarChart = function(canvas, data, gridScale, seriesName, padding, barGap){

  this.canvas = canvas;
  this.ctx = setupCanvas(this.canvas);


  //sets the max value
  this.maxValue = 0;
  for(x in data){
    if(this.maxValue < data[x]){
      this.maxValue = data[x];
    }
  }

  let canvasW = this.canvas.width- padding;
  let canvasH = this.canvas.height - padding;

  //function for drawing grid lines
  this.DrawGridLine = function(){
    let gridValue = 0;
    while(gridValue <= this.maxValue){
      let yHeight = (canvasH) * (1 - gridValue/this.maxValue) + padding;
      drawLine(
        this.ctx,
        0 + padding,
        yHeight, //-padding,
        canvasW ,
        yHeight,// -padding,
        "#000000"
      );

      //adds labels to lines
      this.ctx.save();
      this.ctx.font = "bold 30px Arial";
      console.log(gridValue);
      this.ctx.fillText(gridValue, 0, yHeight);
      this.ctx.restore();

      gridValue = gridValue + gridScale;
    }
  }

  this.drawBars = function(){
    let barNo = 0;
    let barWidth = canvasW / data.length;
    let barIncrement = (canvasH / this.maxValue) ;

    for(x in data){
      drawBar(
        this.ctx,
        barNo * barWidth + padding,
        (this.maxValue - data[x])*barIncrement +padding ,
        barWidth - (barGap *2),
        data[x] *barIncrement,
        getRandomColor(),
        data[x],
      );
      barNo++
    }
  }

  this.drawLabel = function(){
    this.ctx.save();
    this.ctx.textBaseLine = "bottom";
    this.ctx.textAlign = "center";
    this.fillStyle = "#000000";
    this.ctx.font= "bold 40px Arial";
    this.ctx.fillText("Super chart", canvasW / 2, canvasH);
  }





}

let chart = new BarChart(chartArea, value, 2, "chart", 25, 10);
console.log(chart.maxValue);
chart.DrawGridLine();
chart.drawBars();
chart.drawLabel();

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
