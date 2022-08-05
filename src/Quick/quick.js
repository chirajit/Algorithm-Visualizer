var ind = 0;
var flag = 1;
function main() {
     var arrstr = document.getElementById("input_array").value;
     var arry = arrstr.split(" ");
     var ar = [];
     for (let ind = 0; ind < arry.length; ind++)
          ar.push(parseInt(arry[ind]));
     quickSort(ar, 0, ar.length - 1);
     console.log(ar);
     p = down = up = -1;//making the last chart grey
     chart = createChart(ar, p, down, up, down, up);
     chartset.push(chart);
     document.getElementById("sorted").innerHTML = "Sorted array is : " + ar;
     document.getElementsByName("visuals")[0].style.visibility = "visible";
     let repeat = setInterval(function () {
          console.log(chartset[ind]);
          if (flag == 1)
               drawchart(chartset[ind++], "Quick");
          if (ind >= chartset.length)
               clearInterval(repeat);
     }, 1500);
}
var chartset = [];
function partition(a, l, h) {

     var pivot = a[l], down = l + 1, up = h, temp, end = h, beg = l;
     chart = createChart(a, l, down, up, beg, end);
     chartset.push(chart);

     while (down <= up) {
          while (a[down] <= pivot) {
               down++;
               chart = createChart(a, l, down, up, beg, end);//l is the index of selected pivot
               chartset.push(chart);
          }
          while (a[up] > pivot) {
               up--;
               chart = createChart(a, l, down, up, beg, end);
               chartset.push(chart);
          }
          if (down <= up) {
               temp = a[up];
               a[up] = a[down];
               a[down] = temp;
          }
          chart = createChart(a, l, down, up, beg, end);
          chartset.push(chart);
     }
     a[l] = a[up];
     a[up] = pivot;
     chart = createChart(a, up, down, up, beg, end);//up is the index of pivot
     chartset.push(chart);
     pivcopy = up;
     return up;

}
function quickSort(a, l, h) {
     var p;
     if (l < h) {
          p = partition(a, l, h);
          quickSort(a, l, p - 1);
          quickSort(a, p + 1, h);
     }
}

function createChart(ar, pivot, down, up, beg, end) {
     var chart = [];
     for (k = 0; k < ar.length; k++) {
          if (k == pivot)
               bar = { x: k + 1, y: ar[k], color: "#eb3f28" };//the element selected as pivot
          else if (k == up)
               bar = { x: k + 1, y: ar[k], color: "#6F00FF", indexLabel: "up" };//indigo
          else if (k == down)
               bar = { x: k + 1, y: ar[k], color: "#6F00FF", indexLabel: "down" };
          else if (k >= beg && k <= end)
               bar = { x: k + 1, y: ar[k], color: "#6ceb78" }//light green
          else
               bar = { x: k + 1, y: ar[k], color: "#d8e8ed" };//grey
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
}