var flag = 1;
var delay = 1500;
var ind = 0;
function selection() {
     var arrstr = document.getElementById("input_array").value;
     var arry = arrstr.split(" ");
     var ar = [];
     for (let ind = 0; ind < arry.length; ind++)
          ar.push(parseInt(arry[ind]));

     var chartset = [];
     var posi;
     for (i = 0; i < ar.length; i++) {
          posi = i;//position of min element
          min = ar[i];//min element
          for (j = i; j < ar.length; j++) {
               if (ar[j] < min) {
                    posi = j;
                    min = ar[j];
               }
          }
          chart = createChart(ar, i, posi);
          chartset.push(chart);

          ar[posi] = ar[i];
          ar[i] = min;

          chart = createChart(ar, i, posi);
          chartset.push(chart);
     }
     posi = -1;
     chart = createChart(ar, i, posi);
     chartset.push(chart);
     document.getElementById("sorted").innerHTML = "Sorted array is : " + ar;
     document.getElementsByName("visuals")[0].style.visibility = "visible";
     let repeat = setInterval(function () {
          console.log(delay);
          if (flag == 1)
               drawchart(chartset[ind++], "Selection");
          if (ind >= chartset.length)
               clearInterval(repeat);
     }, delay);

}

function createChart(ar, i, posi) {
     chart = [];
     for (k = 0; k < ar.length; k++) {
          if (k < i) {
               bar = { x: k + 1, y: ar[k], color: "#6ceb78" };//green
          }
          else if (k == i) {
               bar = { x: k + 1, y: ar[k], color: "#eb3f28", indexLabel: "Current" };//indexlable is the top label,red
          }
          else if (k == posi) {
               bar = { x: k + 1, y: ar[k], color: "#eb3f28", indexLabel: "Minimum" };
          }
          else {
               bar = { x: k + 1, y: ar[k], color: "#d8e8ed" };//grey
          }
          chart.push(bar);
     }
     return chart;
}

function drawchart(datapts, title) {
     var chart = new CanvasJS.Chart("chartcontainer",
          {
               title: { text: title },
               axisY: { includeZero: true },
               data: [{
                    type: "column",
                    indexLabel: "{y}",
                    indexLabelFontColor: "#8A32B8",
                    indexLabelPlacement: "outside",
                    dataPoints: datapts
               }]
          });

     chart.render();
}

function play(event) {
     var p = document.getElementById('p');
     if (event.target.id == 'pause') {
          flag = 0;
          p.textContent = 'Paused';
     }
     else if (event.target.id == 'resume') {
          flag = 1;
          p.textContent = 'Resumed';
     }
     else if (event.target.id == 'reload') {
          location.reload();
     }
     else if (event.target.id == 'prev') {
          ind = ind - 2;
     }
     else if (event.target.id == 'next') {
          ind++;
     }
     else {
          delay = parseInt(1500 / parseFloat(event.target.id));

     }
}