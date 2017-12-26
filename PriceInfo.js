function revealGraph(StartDate, EndDate){
$.getJSON('https://api.coindesk.com/v1/bpi/historical/close.json?start='+ StartDate + '&end='+ EndDate + '', function(priceJson) {
   var xTemp = [];
   var yTemp = [];
   for(var date in priceJson.bpi){
    //cycle through the keys and values and store them in seperate arrays
   	if(priceJson.bpi.hasOwnProperty(date)){
   		xTemp.push(date);
   		yTemp.push(priceJson.bpi[date]);
   	}
   }
   // plot the graph with the two arrays formed from the JSON
 var pricedata = [
   {
   	x: xTemp,
   	y: yTemp,
   	type: 'scatter'
   }
   ];
    Plotly.newPlot('PriceGraph', pricedata);

    //max and min
     var max = Math.max.apply(null, yTemp);
     var min = Math.min.apply(null, yTemp);
     var maxIndex = yTemp.indexOf(max);
     var minIndex = yTemp.indexOf(min);
     var maxDate = xTemp[maxIndex];
     var minDate = xTemp[minIndex];
     var maxP = document.getElementById("MaxInfo");
     var minP = document.getElementById("MinInfo");
     maxP.innerHTML = "MAX: $" + Math.floor(max) + " and occured on " + maxDate;
     minP.innerHTML = "MIN: $" + Math.floor(min) + " and occured on "+ minDate;
     maxP.className = "center-block info";
     minP.className = "center-block info";
     //end max and min

     //percent difference
     var first = yTemp[0];
     var arrLength =  yTemp.length;
     var last = yTemp[arrLength - 1];
     var diff = last - first;
     var percent = (diff/first) * 100;
     var flag = "Increased by ";
     var id = "center-block inc";
     var flag2 = "+";
     if(diff < 0){
       percent = percent*(-1);
       flag = "Decreased by ";
       id = "center-block dec";
       diff = diff*(-1);
       flag2 = "-";
     }
     var percentP = document.getElementById("percent");
     percentP.innerHTML = flag + " " + Math.floor(percent) + " percent, " + flag2 + " $"+ Math.floor(diff);
     percentP.className = id;
     //end percent difference

    //start and end price
    //use first and last from yTemp above
    var startP = document.getElementById("startPrice");
    var endP = document.getElementById("endPrice");
    startPrice.innerHTML = "Start price ("+ xTemp[0] + "): $" + Math.floor(first);
    startPrice.className = "info";
    endPrice.innerHTML = "End price ("+xTemp[xTemp.length - 1]+"): $" + Math.floor(last);
    endPrice.className = "info";
    // end start and end price
});
}

function pastMonth(){
  var date = new Date();
  var lastM = date.getMonth();
  var currM = date.getMonth() + 1;
  var currYD = date.getDate();
  if(currYD < 10){//if not corect input
    currYD = "0" + currYD;
  } 
  if(lastM < 10){//if not corect input
    lastM = "0" + lastM;
  }
  if(currM < 10){//if not corect input
    currM = "0" + currM;
  }
  var lastMonth = date.getFullYear() + "-" + lastM  + "-" + currYD;
  var currentMonth = date.getFullYear() + "-" + currM + "-" + currYD;
  revealGraph(lastMonth,currentMonth);
}

function past3Months(){
  var date = new Date();
  var last3M = date.getMonth() - 2;
  var curr3M = date.getMonth() + 1;
  var currYD = date.getDate();
  if(currYD < 10){
    //if not corect input
    currYD = "0" + currYD;
  } 
  if(last3M < 10){
    //if not corect input
    last3M = "0" + last3M;
  }
  if(curr3M < 10){
    //if not corect input
    curr3M = "0" + curr3M;
  }
  var currentMonth3 = date.getFullYear() + "-" + curr3M + "-" + currYD;
  var lastMonth3 = date.getFullYear() + "-" + last3M + "-" + currYD;
 revealGraph(lastMonth3,currentMonth3);
}


function past6Months(){

  var date = new Date();
  var last3M = date.getMonth() - 5;
  var curr3M = date.getMonth() + 1;
  var currYD = date.getDate();
  if(currYD < 10){
    //if not corect input
    currYD = "0" + currYD;
  } 
  if(last3M < 10){
    //if not corect input
    last3M = "0" + last3M;
  }
  if(curr3M < 10){
    //if not corect input
    curr3M = "0" + curr3M;
  }
  var currentMonth3 = date.getFullYear() + "-" + curr3M + "-" + currYD;
  var lastMonth3 = date.getFullYear() + "-" + last3M + "-" + currYD;
 revealGraph(lastMonth3,currentMonth3);

}

function pastYear(){
  var date = new Date();
  var currYM = date.getMonth() + 1;
  var currYD = date.getDate();
  if(currYD < 10){
    //if not corect input
    currYD = "0" + currYD;
  } 
  if(currYM < 10){//if not corect input
    currYM = "0" + currYM;
  }
  var lastMonth = (date.getFullYear() - 1) + "-" + currYM  + "-" + currYD;
  var currentMonth = date.getFullYear() + "-" + currYM + "-" + currYD;
  revealGraph(lastMonth,currentMonth);
}

