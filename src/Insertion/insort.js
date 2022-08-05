function insort(arrstr) {
     var arry = arrstr.split(" ");
     var arr = [];
     for (let ind = 0; ind < arry.length; ind++)
          arr.push(parseInt(arry[ind]));
     var ListOfDataSets = [];
     var i, j, data;
     for (i = 1; i < arr.length; i++) {
          ele = arr[i];
          for (j = i - 1; j >= 0; j--) {
               data = createDataSet(arr, i, j + 1);
               ListOfDataSets.push(data);

               if (arr[j] > arr[j + 1]) {
                    arr[j + 1] = arr[j];
                    arr[j] = ele;
               }
               else
                    break;
          }
          if (j < 0) {
               data = createDataSet(arr, i, j + 1);
               ListOfDataSets.push(data);
          }
     }
     data = createDataSet(arr, arr.length, -1);
     ListOfDataSets.push(data);
     document.getElementById("sorted").innerHTML = "Sorted array is : " + arr;
     setTimeout(function () {
          document.getElementsByName("visuals")[0].style.visibility = "visible";
     }, 1000);
     var ind = 0;
     let repeat = setInterval(function () {
          drawchart(ListOfDataSets[ind++], "insort");
          if (ind >= ListOfDataSets.length)
               clearInterval(repeat);
     }, 1000);
}

function createDataSet(arr, ind, curr) {
     var listOfDicts = [];
     for (let i = 0; i < arr.length; i++) {
          if (i == curr) {
               var dict = { x: i + 1, y: arr[i], label: arr[i], color: "#eb3f28", indexLabel: "\u2193" };
               listOfDicts.push(dict);//
          }
          else if (i <= ind) {
               var dict = { x: i + 1, y: arr[i], label: arr[i], color: "#6ceb78" };
               listOfDicts.push(dict);
          }
          else {
               var dict = { x: i + 1, y: arr[i], label: arr[i], color: "#d8e8ed" };
               listOfDicts.push(dict);
          }
     }
     return listOfDicts;
}

function drawchart(datapts, title) {
     var chart = new CanvasJS.Chart("chartcontainer",
          {
               title: { text: title },
               axisY: { includeZero: true },
               data: [{ type: "column", indexLabelFontColor: "#8A32B8", indexLabelPlacement: "outside", dataPoints: datapts }]
          });

     chart.render();
}
if (document.getElementById("sort"))
     document.getElementById("sort").onclick = function () { insort(document.getElementById("input_array").value) };