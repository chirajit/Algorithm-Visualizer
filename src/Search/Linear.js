function main() {
     var arrstr = document.getElementById("input_array").value;
     var arry = arrstr.split(" ");
     var ar = [];
     for (let ind = 0; ind < arry.length; ind++)
          ar.push(parseInt(arry[ind]));
     var e = document.getElementById("search").value;

     var chartset = [];
     var suc = 0;
     chart = createChart(ar, -1, suc);
     chartset.push(chart);
     for (i = 0; i < ar.length; i++) {
          chart = createChart(ar, i, suc);
          chartset.push(chart);
          if (ar[i] == e) {
               suc = 1;
               chart = createChart(ar, i, suc, e);
               chartset.push(chart);
               break;
          }
     }
     if (suc == 0) {
          chart = createChart(ar, -1, -1);
          chartset.push(chart);
     }
     document.getElementsByName("visuals")[0].style.visibility = "visible";
     var ind = 0;
     let repeat = setInterval(function () {
          drawchart(chartset[ind++], "Linear Search");
          if (ind >= chartset.length)
               clearInterval(repeat);
     }, 1500);
}

function createChart(ar, i, succ, e) {
     chart = [];
     for (k = 0; k < ar.length; k++) {
          if (succ == 1 && k == i) {
               bar = { x: k + 1, y: ar[k], color: "#6ceb78", indexLabel: "Found" };//indexlable is the top label
          }
          else if (k == i) {
               bar = { x: k + 1, y: ar[k], color: "#eb3f28" };
          }
          else {
               bar = { x: k + 1, y: ar[k], color: "#d8e8ed" };//blue
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