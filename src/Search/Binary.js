function main() {
     var arrstr = document.getElementById("input_array").value;
     var arry = arrstr.split(" ");
     var ar = [];
     for (let ind = 0; ind < arry.length; ind++)
          ar.push(parseInt(arry[ind]));
     var e = parseInt(document.getElementById("search").value);

     var chartset = [];
     var low = 0, high = ar.length - 1, suc = 0, mid = -1;
     while (low <= high) {
          chart = createChart(ar, mid, low, high, suc);
          chartset.push(chart);
          mid = parseInt((low + high) / 2);
          //console.log(mid);
          chart = createChart(ar, mid, low, high, suc);
          chartset.push(chart);
          if (e == ar[mid]) {
               //Found
               suc = 1;
               chart = createChart(ar, mid, low, high, suc);
               chartset.push(chart);
               //console.log(mid + "found");
               break;
          }
          if (e < ar[mid]) {
               high = mid - 1;
          }
          else {
               low = mid + 1;
          }
     }
     if (suc == 0) {
          chart = createChart(ar, -1, -1, -1, 0);
          chartset.push(chart);
     }
     document.getElementsByName("visuals")[0].style.visibility = "visible";
     var ind = 0;
     let repeat = setInterval(function () {
          drawchart(chartset[ind++], "Binary Search");
          if (ind >= chartset.length)
               clearInterval(repeat);
     }, 1500);
}

function createChart(ar, mid, l, h, suc) {
     chart = [];
     for (k = 0; k < ar.length; k++) {
          if (suc == 1 && k == mid) {
               bar = { x: k + 1, y: ar[k], color: "#6ceb78", indexLabel: "Found" };//green
          }
          else if (k == mid) {
               bar = { x: k + 1, y: ar[k], color: "#eb3f28", indexLabel: "mid" };//indexlable is the top label(red)
          }
          else if (k >= l && k <= h) {
               bar = { x: k + 1, y: ar[k], color: "#6F00FF" };//blue
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