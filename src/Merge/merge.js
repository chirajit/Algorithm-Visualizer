var chartset1 = [];
var chartset2 = [];
var ar = [];
var chart1 = [];
var chart2 = [];
var timer = 1500;

function main() {
     document.getElementsByName("visuals")[0].style.visibility = "visible";
     var arrstr = document.getElementById("input_array").value;
     var arry = arrstr.split(" ");
     for (let ind = 0; ind < arry.length; ind++)
          ar.push(parseInt(arry[ind]));

     chart1 = createChart1(0, ar.length - 1, "#d8e8ed");//grey
     setTimeout(drawchart, timer, chart1, "Merge", "chartcontainer1");
     timer += 1500;
     merge_sort(0, ar.length - 1);
     document.getElementById("sorted").innerHTML = "Sorted array is : " + ar;
}

function merge_sort(beg, end) {
     chart1 = createChart1(beg, end, "#6F00FF");//blue
     setTimeout(drawchart, timer, chart1, "Merge", "chartcontainer1");
     timer += 1500;

     if (beg < end) {
          var mid = parseInt((beg + end) / 2);

          merge_sort(beg, mid);
          merge_sort(mid + 1, end);

          chart1 = createChart3(beg, mid, end, "orange", "#eb3f28");//red
          setTimeout(drawchart, timer, chart1, "Merge", "chartcontainer1");
          timer += 1500;

          merge(beg, mid, end);

          chart1 = createChart1(beg, end, "#6ceb78");//green
          setTimeout(drawchart, timer, chart1, "Merge", "chartcontainer1");
          timer += 1500;
     }

}

function merge(beg, mid, end) {
     var i = beg, j = mid + 1, k = 0;
     var temp = [];
     while ((i <= mid) && (j <= end)) {
          if (ar[i] < ar[j]) {
               temp[k] = ar[i];
               i++;
          }
          else {
               temp[k] = ar[j];
               j++;
          }
          chart2 = createChart2(temp);
          setTimeout(drawchart, timer, chart2, "Temp", "chartcontainer2");
          timer += 1500;
          k++;
     }
     while (i <= mid) {
          temp[k] = ar[i];
          chart2 = createChart2(temp);
          setTimeout(drawchart, timer, chart2, "Temp", "chartcontainer2");
          timer += 1500;
          i++;
          k++;
     }
     while (j <= end) {
          temp[k] = ar[j];
          chart2 = createChart2(temp);
          setTimeout(drawchart, timer, chart2, "Temp", "chartcontainer2");
          timer += 1500;
          j++;
          k++;
     }
     j = beg;
     for (i = 0; i < k; i++) {
          ar[j] = temp[i];
          j++;
     }
}

function createChart1(start, end, color) {
     k = 0;
     newchart = [];

     for (k = 0; k < ar.length; k++) {
          if (k >= start && k <= end) {
               bar = { x: k + 1, y: ar[k], color: color };
          }
          else {
               bar = { x: k + 1, y: ar[k], color: "#d8e8ed" };
          }
          newchart.push(bar);
     }

     return newchart;
}

function createChart3(start, mid, end, color1, color2) {
     k = 0;
     newchart = [];

     for (k = 0; k < ar.length; k++) {
          if (k >= start && k <= mid) {
               bar = { x: k + 1, y: ar[k], color: color1 };
          }
          else if (k > mid && k <= end) {
               bar = { x: k + 1, y: ar[k], color: color2 };
          }
          else {
               bar = { x: k + 1, y: ar[k], color: "#d8e8ed" };
          }
          newchart.push(bar);
     }

     return newchart;

}

function createChart2(temp) {
     newchart = [];
     for (k = 0; k < temp.length; k++) {
          bar = { x: k + 1, y: temp[k], color: "#6ceb78" };
          newchart.push(bar);
     }

     return newchart;
}

function drawchart(datapts, title, container) {
     var chart = new CanvasJS.Chart(container,
          {
               title: { text: title },
               axisY: { includeZero: true },
               data: [{
                    type: "column",
                    indexLabel: "{y}",
                    indexLabelPlacement: "outside",
                    dataPoints: datapts
               }]
          });

     chart.render();
}